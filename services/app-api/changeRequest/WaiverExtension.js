import { getLinksHtml } from "./changeRequest-util";
import updatePackage from "../utils/updatePackage";
import packageExists from "../utils/packageExists";
import { RESPONSE_CODE } from "cmscommonlib";

/**
 * Waiver Extension submission specific email generation functions.
 * @class
 */
class WaiverExtension {
  /**
   * Waiver Extension Submissions require that the Package ID is in the system.
   * @param {Object} data the received data
   * @returns {String} any errors
   */
  async fieldsValid(data) {
    let areFieldsValid = false;
    let whyNot = "";
    let doesExist = false;
    try {
      doesExist = await packageExists(data.transmittalNumber);
    } catch (error) {
      throw error;
    }
    if (doesExist) {
      console.log("the Item exists");
      areFieldsValid = true;
    } else {
      console.log("result.Item does not exist");
      areFieldsValid = false;
      whyNot = RESPONSE_CODE.ID_NOT_FOUND;
    }

    return { areFieldsValid, whyNot };
  }

  /**
   * Waiver Extension submission email to CMS details wrapped in generic function name.
   * @param {Object} data from the form submission.
   * @returns {Object} email parameters in generic format.
   */
  getCMSEmail(data) {
    const cmsEmail = {};
    let transmittalNumberWarningMessage = data.transmittalNumberWarningMessage
      ? `<br/>${data.transmittalNumberWarningMessage}`
      : "";

    cmsEmail.ToAddresses = [process.env.reviewerEmail];
    cmsEmail.Subject =
      "New Waiver Extension for " + data.transmittalNumber + " submitted";
    cmsEmail.HTML =
      `
        <p>The Submission Portal received a Request for Waiver Extension Submission:</p>
        <p>
            <br><b>Name</b>: ${data.user.firstName} ${data.user.lastName}
            <br><b>Email Address</b>: ${data.user.email}
            <br><b>Waiver #</b>: ${data.transmittalNumber}` +
      transmittalNumberWarningMessage +
      `
        </p>
        <p>
            <b>Additional Information</b>:
            <br>${data.summary}
        </p>
        <p>
            <b>Files</b>:
            ${getLinksHtml(data.uploads)}
        </p>
        <br>
        <p>If the contents of this email seem suspicious, do not open them, and instead forward this email to <a href="mailto:SPAM@cms.hhs.gov">SPAM@cms.hhs.gov</a>.</p>
        <p>Thank you!</p>
    `;

    return cmsEmail;
  }

  /**
   * Waiver Extension submission confimation email to State Submitter wrapped in
   * generic function name.
   * @param {Object} data from the form submission.
   * @returns {Object} email parameters in generic format.
   */
  getStateEmail(data) {
    const stateEmail = {};

    stateEmail.ToAddresses = [data.user.email];
    stateEmail.Subject =
      "Your Request for Waiver Extension " +
      data.transmittalNumber +
      " has been submitted to CMS";
    stateEmail.HTML = `
        <p>This response confirms the receipt of your Waiver Extension submission:</p>
        <p>
            <br><b>Waiver #</b>: ${data.transmittalNumber}
            <br><b>Submitter name</b>: ${data.user.firstName} ${data.user.lastName}
            <br><b>Submitter email</b>: ${data.user.email}
        </p>
        <p>
            <b>Additional Information</b>:<br>
            ${data.summary}
        </p>
        <br>
        <p>
            This mailbox is for the submittal of Section 1915(b) and 1915(c) non-web-based Waivers, 
            responses to Requests for Additional Information (RAI), and extension requests on Waivers only. 
            Any other correspondence will be disregarded.
        </p>
        <p>If you have any questions, please contact <a href="mailto:spa@cms.hhs.gov">spa@cms.hhs.gov</a> or your state lead.</p>
        <p>Thank you!</p>
    `;

    return stateEmail;
  }

  saveSubmission(data) {
    let submitterName = data.user.firstName + " " + data.user.lastName;
    let extensionRequestData = {
      packageID: data.transmittalNumber,
      packageStatus: "Extension Requested",
      timestamp: data.submittedAt,
      extensionRequestSubmissionDate: data.submittedAt,
      extensionRequestAttachments: data.uploads,
      extensionRequestAdditionalInformation: data.summary,
      extensionRequestSubmitterName: submitterName,
      extensionRequestSubmitterEmail: data.user.email,
      lastModifiedByName: submitterName,
      lastModifiedByEmail: data.user.email,
    };

    updatePackage(extensionRequestData);
  }
}

const instance = new WaiverExtension();
Object.freeze(instance);
export default instance;
