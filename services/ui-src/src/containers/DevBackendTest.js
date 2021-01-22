import React, { useState, useEffect } from "react";
import LoadingScreen from "../components/LoadingScreen";
import { TextField } from "@cmsgov/design-system";
import ChangeRequestDataApi from "../utils/ChangeRequestDataApi";
import PropTypes from "prop-types";
import { ALERTS_MSG } from "../libs/alert-messages";
import PageTitleBar, { TITLE_BAR_ID } from "../components/PageTitleBar";
import { CHANGE_REQUEST_TYPES } from "../changeRequest/changeRequestTypes";
import { Alert } from "@cmsgov/design-system";
import TransmittalNumber from "../components/TransmittalNumber";
import RequiredChoice from "../components/RequiredChoice";
import { ERROR_MSG } from "../libs/error-messages";

/**
 * RAI Form template to allow rendering for different types of RAI's.
 * @param {Object} formInfo - all the change request details specific to this submission
 * @param {String} changeRequestType - the type of change request
 */
const DevBackend = ({  changeRequestType }) => {
  // for setting the alert

  const formInfo = {
    pageTitle: "Submit New SPA",
    readOnlyPageTitle: "SPA Submission Details",
    detailsHeader: "SPA",
    requiredUploads: ["CMS Form 179", "SPA Pages"],
    optionalUploads: [
      "Cover Letter",
      "Existing State Plan Page(s)",
      "Document Demonstrating Good-Faith Tribal Engagement",
      "Tribal Consultation",
      "Public Notice",
      "Standard Funding Questions (SFQs)",
      "Other",
    ],
    idType: "spa",
    idLabel: "SPA ID",
    idMustExist: false,
  };

  const [alert, setAlert] = useState(ALERTS_MSG.NONE);

  // because the first time through, we do not want to be annoying with the error messaging
  const [firstTimeThrough, setFirstTimeThrough] = useState(true);

  const [backendResponse, setBackendResponse] = useState("")

  const [actionTypeErrorMessage, setActionTypeErrorMessage] = useState("");

  const [
    waiverAuthorityErrorMessage,
    setWaiverAuthorityErrorMessage,
  ] = useState("");
  const [
    transmittalNumberErrorMessage,
    setTransmittalNumberErrorMessage,
  ] = useState("");

  // True if we are currently submitting the form or on inital load of the form
  const [isLoading, setIsLoading] = useState(false);

  // The browser history, so we can redirect to the home page

  //Reference to the File Uploader.

  // The record we are using for the form.
  const [changeRequest, setChangeRequest] = useState({
    type: changeRequestType,
    summary: "",
    transmittalNumber: "", //This is needed to be able to control the field
    actionType: "",
    waiverAuthority: "",
  });


  const jumpToPageTitle = () => {
    var elmnt = document.getElementById(TITLE_BAR_ID);
    if (elmnt) elmnt.scrollIntoView();
  };

  useEffect(() => {
    let mounted = true;
    if (mounted && alert && alert.heading && alert.heading !== "") {
      jumpToPageTitle();
    }

    return function cleanup() {
      mounted = false;
    };
  }, [alert]);

  const renderAlert = (alert) => {
    if (!alert) return;
    if (alert.heading && alert.heading !== "") {
      return (
          <div className="alert-bar">
            <Alert variation={alert.type} heading={alert.heading}>
              <p className="ds-c-alert__text">{alert.text}</p>
            </Alert>
          </div>
      );
    }
  };


  /**
   * Handle changes to the ID.
   * @param {Object} event the event
   */
  async function handleTransmittalNumberChange(event) {
    if (!event || !event.target) return;

    let updatedRecord = { ...changeRequest }; // You need a new object to be able to update the state
    updatedRecord[event.target.name] = event.target.value;
    updatedRecord["type"] = CHANGE_REQUEST_TYPES.SPA
    updatedRecord["territory"] =    event.target.value.toString().substring(0,2)
    setChangeRequest(updatedRecord);

  }

  /**
   * Handle changes to the form.
   * @param {Object} event the event
   */
  const handleInputChange = (event) => {
    if (!event || !event.target) return;

    let updatedRecord = { ...changeRequest }; // You need a new object to be able to update the state


    updatedRecord[event.target.name] = event.target.value;

    let actionTypeMessage = "";
    let waiverAuthorityMessage = "";

    if (!firstTimeThrough) {
      if (formInfo.actionType && !updatedRecord.actionType)
        actionTypeMessage = formInfo.actionType.errorMessage;
      if (formInfo.waiverAuthority && !updatedRecord.waiverAuthority)
        waiverAuthorityMessage = formInfo.waiverAuthority.errorMessage;
    }

    updatedRecord["type"] = CHANGE_REQUEST_TYPES.SPA
    updatedRecord["territory"] = event.target.value.toString().substring(0,2);
    // state set functions have to be at top level
    // because we can't trust they got set, can't use them in the function
    setChangeRequest(updatedRecord);
    setActionTypeErrorMessage(actionTypeMessage);
    setWaiverAuthorityErrorMessage(waiverAuthorityMessage);
  };

  /**
   * Submit the new change request.
   * @param {Object} event the click event
   */
  async function handleSubmit(event) {
    event.preventDefault();

    // in case form validation takes a while (external validation)
    setIsLoading(true);

    // once Submit is clicked, show error messages
    setFirstTimeThrough(false);


    // validate the form fields and set the messages
    // because this is an asynchronous function, you can't trust that the
    let actionTypeMessage = "";
    let waiverAuthorityMessage = "";
    let transmittalNumberMessage = "";
    let newAlert = null;
    let mounted = true;


    // check which alert to show.  Fields first, than attachments
    // if all passes, submit the form and return to dashboard
     if ( true) {
      try {
        let uploadedList =  { "uploads": [{"s3Key":"wewewe","filename":"foo","contentType":"","url":"foo","title":"CMS Form 179"}]}
        console.log("changeRequest is: ", changeRequest);
        const aresponse = await ChangeRequestDataApi.submit( changeRequest, uploadedList);
        console.log("Response is: ", aresponse)
        setBackendResponse(aresponse)
        if (!aresponse.error) {
          newAlert = ALERTS_MSG.SUBMISSION_SUCCESS;
        } else switch (aresponse.error) {
          case ERROR_MSG.TRANSMITTAL_ID_TERRITORY_NOT_VALID:
            newAlert = ALERTS_MSG.SUBMISSION_TERRITORY_ERROR;
            break;
          case ERROR_MSG.DUPLICATE_ID:
            newAlert = ALERTS_MSG.SUBMISSION_DUPLICATE_ID;
            break;
          case ERROR_MSG.ID_NOT_FOUND:
            newAlert = ALERTS_MSG.SUBMISSION_ID_NOT_FOUND;
            break;
          case ERROR_MSG.WAIVER_RENEWAL_ID:
            newAlert = ALERTS_MSG.WAIVER_RENEWAL_ID;
            break;
          case ERROR_MSG.WAIVER_AMENDMENT_ON_K:
            newAlert = ALERTS_MSG.WAIVER_AMENDMENT_ON_K;
            break;
          case ERROR_MSG.WAIVER_NEW_ON_K:
            newAlert = ALERTS_MSG.WAIVER_NEW_ON_K;
            break;
          case ERROR_MSG.WAIVER_NEW_NOT_K:
            newAlert = ALERTS_MSG.WAIVER_NEW_NOT_K;
            break;
          case ERROR_MSG.WAIVER_ACTION_UNKNOWN:
            newAlert = ALERTS_MSG.WAIVER_ACTION_UNKNOWN;
            break;
          default:
            newAlert = ALERTS_MSG.SUBMISSION_ERROR;
            break;
        }
      } catch (error) {
        console.log("Error is: ", error);
        newAlert = ALERTS_MSG.SUBMISSION_ERROR
      }
    }
    if (newAlert === ALERTS_MSG.SUBMISSION_SUCCESS) {

      newAlert = ALERTS_MSG.SUBMISSION_SUCCESS;
    }

    // now set the state variables to show thw error messages
    if (mounted) setTransmittalNumberErrorMessage(transmittalNumberMessage);
    if (mounted) setActionTypeErrorMessage(actionTypeMessage);
    if (mounted) setWaiverAuthorityErrorMessage(waiverAuthorityMessage);
    if (mounted) setAlert(newAlert);
    if (mounted) setIsLoading(false)
    if (mounted) jumpToPageTitle();
  }

  const renderTransmittalNumber = () => {
    return (
        <TransmittalNumber
            idType={formInfo.idType}
            errorMessage={transmittalNumberErrorMessage}
            value={changeRequest.transmittalNumber}
            onChange={handleTransmittalNumberChange}
        />
    );
  };

  // Render the component conditionally when NOT in read only mode
  // OR in read only mode when change request data was successfully retrieved
  return (
      <LoadingScreen isLoading={isLoading}>
        <PageTitleBar
            heading="Backend Test"
            text=""
        />
        {renderAlert(alert)}

        <div className="form-container">
          <form
              onSubmit={handleSubmit}
              noValidate
              className={!firstTimeThrough ? "display-errors" : ""}
          >
            <h3>{formInfo.detailsHeader} Details</h3>
            <p className="req-message">
              <span className="required-mark">*</span>
              indicates required field.
            </p>
            <div className="form-card">
              {formInfo.actionType && (
                  <RequiredChoice
                      fieldInfo={formInfo.actionType}
                      label="Action Type"
                      errorMessage={actionTypeErrorMessage}
                      value={changeRequest.actionType}
                      onChange={handleInputChange}
                  />
              )}
              {formInfo.waiverAuthority && (
                  <RequiredChoice
                      fieldInfo={formInfo.waiverAuthority}
                      label="Waiver Authority"
                      errorMessage={waiverAuthorityErrorMessage}
                      value={changeRequest.waiverAuthority}
                      onChange={handleInputChange}
                  />
              )}
              {renderTransmittalNumber()}
            </div>
            <div className="backend">
              <TextField
                  id={"backendResponse"}
                  name="Backend Response"
                  label="Backend Response"
                  value={JSON.stringify(backendResponse)}
                  disabled={true}
              ></TextField>
            </div>
            <input type="submit" className="form-submit" value="Submit" />
          </form>
        </div>
      </LoadingScreen>
  );
};

DevBackend.propTypes = {
  formInfo: PropTypes.object.isRequired,
  changeRequestType: PropTypes.string.isRequired,
};

export default DevBackend;
