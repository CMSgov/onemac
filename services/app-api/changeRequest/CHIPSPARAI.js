import { getAccessInstructions, getLinksHtml } from "./changeRequest-util";
import packageExists from "../utils/packageExists";
import { RESPONSE_CODE } from "cmscommonlib";

/**
 * CHIP SPA RAI submission specific email generation functions.
 * @class
 */
class CHIPSPARAI {
  /**
   * SPA RAI Submissions require that the Package ID is in the system.
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
      console.log("CHIPSPARAI packageExists call error: ", error);
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
   * SPA RAI submission email to CMS details wrapped in generic function name.
   * @param {Object} data from the form submission.
   * @returns {Object} email parameters in generic format.
   */
  getCMSEmail(data) {
    const cmsEmail = {};

    cmsEmail.ToAddresses = [
      process.env.reviewerCHIPEmail,
      process.env.testingEmail,
    ].filter(Boolean);
    cmsEmail.Subject =
      "New CHIP SPA RAI " + data.transmittalNumber + " submitted";
    cmsEmail.HTML = `
        <p>The Submission Portal received a CHIP SPA RAI Submission:</p>
        ${getAccessInstructions()}
        <p>
            <br><b>Name</b>: ${data.user.firstName} ${data.user.lastName}
            <br><b>Email Address</b>: ${data.user.email}
            <br><b>SPA ID</b>: ${data.transmittalNumber}
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
   * SPA RAI submission confimation email to State Submitter wrapped in
   * generic function name.
   * @param {Object} data from the form submission.
   * @returns {Object} email parameters in generic format.
   */
  getStateEmail(data) {
    const stateEmail = {};

    stateEmail.ToAddresses = [data.user.email];
    stateEmail.Subject =
      "Your CHIP SPA RAI " +
      data.transmittalNumber +
      " has been submitted to CMS";
    stateEmail.HTML = `
        <p>This response confirms the receipt of your CHIP SPA RAI submission:</p>
        <p>
            <br><b>SPA ID</b>: ${data.transmittalNumber}
            <br><b>Submitter name</b>: ${data.user.firstName} ${data.user.lastName}
            <br><b>Submitter email</b>: ${data.user.email}
        </p>
        <p>
            <b>Additional Information</b>:<br>
            ${data.summary}
        </p>
        <br>
        <p>
            This response confirms the receipt of your CHIP State Plan Amendment (SPA or your response to a SPA Request for Additional Information (RAI)). 
        </p>
        <p>If you have any questions, please contact <a href="mailto:CHIPSPASubmissionMailBox@cms.hhs.gov">CHIPSPASubmissionMailBox@cms.hhs.gov</a> or your state lead.</p>
        <p>Thank you!</p>
    `;

    return stateEmail;
  }
}

const instance = new CHIPSPARAI();
Object.freeze(instance);
export default instance;
