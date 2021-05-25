import React, { useRef, useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";
import FileUploader from "../components/FileUploader";
import { TextField } from "@cmsgov/design-system";
import ChangeRequestDataApi from "../utils/ChangeRequestDataApi";
import {
  latestAccessStatus,
  RESPONSE_CODE,
  ROUTES,
  USER_STATUS,
} from "cmscommonlib";
import PropTypes from "prop-types";
import PageTitleBar from "../components/PageTitleBar";
import TransmittalNumber from "../components/TransmittalNumber";
import RequiredChoice from "../components/RequiredChoice";
import AlertBar from "../components/AlertBar";
import { useAppContext } from "../libs/contextLib";

/**
 * RAI Form template to allow rendering for different types of RAI's.
 * @param {Object} formInfo - all the change request details specific to this submission
 * @param {String} changeRequestType - the type of change request
 */
export const SubmissionForm = ({ formInfo, changeRequestType }) => {
  // for setting the alert
  const [alertCode, setAlertCode] = useState("NONE");
  const {
    userProfile: { userData },
  } = useAppContext();

  // True when the required attachments have been selected.
  const [areUploadsReady, setAreUploadsReady] = useState(false);

  // because the first time through, we do not want to be annoying with the error messaging
  const [firstTimeThrough, setFirstTimeThrough] = useState(true);

  const [actionTypeErrorMessage, setActionTypeErrorMessage] = useState("");
  const [waiverAuthorityErrorMessage, setWaiverAuthorityErrorMessage] =
    useState("");
  const [transmittalNumberStatusMessage, setTransmittalNumberStatusMessage] =
    useState({
      statusLevel: "error",
      statusMessage: "",
    });

  // True if we are currently submitting the form or on inital load of the form
  const [isLoading, setIsLoading] = useState(false);

  // The browser history, so we can redirect to the home page
  const history = useHistory();

  //Reference to the File Uploader.
  const uploader = useRef(null);

  // because the transmittal number has state
  const [transmittalNumberDetails, setTransmittalNumberDetails] = useState({
    ...formInfo.transmittalNumber,
  });

  // The record we are using for the form.
  const [changeRequest, setChangeRequest] = useState({
    type: changeRequestType,
    territory: "",
    summary: "",
    transmittalNumber: "", //This is needed to be able to control the field
    actionType: "",
    waiverAuthority: "",
  });

  /**
   * Callback for the uploader to set if the upload requirements are met.
   * @param {Boolean} state true if the required uploads have been specified
   */
  function uploadsReadyCallbackFunction(state) {
    setAreUploadsReady(state);
  }

  /**
   * Validate Field
   * @param {value} Transmittal Number Field Entered on Change Event.
   */
  function matchesRegex(fieldValue, regexFormatString) {
    let fieldValidationRegEx = new RegExp(regexFormatString);
    let result = false;

    if (fieldValue && fieldValidationRegEx.test(fieldValue)) {
      result = true;
    } else {
      result = false;
    }

    return result;
  }

  const validateTransmittalNumber = useCallback(
    (newTransmittalNumber) => {
      let errorMessage = "";

      // Must have a value
      if (!newTransmittalNumber) {
        if (!firstTimeThrough)
          errorMessage = `${transmittalNumberDetails.idLabel} Required`;
      }
      // state code must be on the User's active state list
      else if (
        newTransmittalNumber.length >= 2 &&
        latestAccessStatus(userData, newTransmittalNumber.substring(0, 2)) !==
          USER_STATUS.ACTIVE
      ) {
        errorMessage = `You can only submit for a state you have access to. If you need to add another state, visit your user profile to request access.`;
      }
      // must match the associated Regex string for format
      else if (
        !matchesRegex(newTransmittalNumber, transmittalNumberDetails.idRegex)
      ) {
        errorMessage = `The ${transmittalNumberDetails.idLabel} must be in the format of ${transmittalNumberDetails.idFormat}`;
      }

      return errorMessage;
    },
    [transmittalNumberDetails, firstTimeThrough, userData]
  );

  /**
   * Handle changes to the ID.
   * @param {Object} event the event
   */
  async function handleTransmittalNumberChange(newTransmittalNumber) {
    let updatedRecord = { ...changeRequest }; // You need a new object to be able to update the state
    updatedRecord["transmittalNumber"] = newTransmittalNumber;
    updatedRecord["territory"] = newTransmittalNumber
      .toString()
      .substring(0, 2);
    setChangeRequest(updatedRecord);
  }

  /**
   * Handle changes to the action type.
   * @param {Object} event the event
   */
  const handleActionTypeChange = (event) => {
    if (!event || !event.target) return;

    let updatedRecord = { ...changeRequest }; // You need a new object to be able to update the state

    updatedRecord[event.target.name] = event.target.value;

    let transmittalNumberInfo;

    switch (updatedRecord.actionType) {
      case "new":
        transmittalNumberInfo = formInfo.newTransmittalNumber;
        break;
      case "amendment":
        transmittalNumberInfo = formInfo.amendmentTransmittalNumber;
        break;
      case "renewal":
        transmittalNumberInfo = formInfo.renewalTransmittalNumber;
        break;
      default:
        transmittalNumberInfo = formInfo.transmittalNumber;
        break;
    }

    setTransmittalNumberDetails(transmittalNumberInfo);
    setChangeRequest(updatedRecord);
  };

  /**
   * Handle changes to the form.
   * @param {Object} event the event
   */
  const handleInputChange = (event) => {
    if (!event || !event.target) return;

    let updatedRecord = { ...changeRequest }; // You need a new object to be able to update the state

    updatedRecord[event.target.name] = event.target.value;

    setChangeRequest(updatedRecord);
  };

  useEffect(() => {
    let waiverAuthorityMessage = "";
    let actionTypeMessage = "";

    if (!firstTimeThrough) {
      if (formInfo.actionType && !changeRequest.actionType)
        actionTypeMessage = formInfo.actionType.errorMessage;

      if (formInfo.waiverAuthority && !changeRequest.waiverAuthority)
        waiverAuthorityMessage = formInfo.waiverAuthority.errorMessage;
    }

    // validate that the ID is in correct format
    let newMessage = {
      statusLevel: "error",
      statusMessage: "",
    };
    let checkingNumber = changeRequest.transmittalNumber;

    newMessage.statusMessage = validateTransmittalNumber(
      changeRequest.transmittalNumber
    );

    // if the ID is valid, check if exists/not exist in data
    if (newMessage.statusMessage === "" && checkingNumber !== "") {
      newMessage.statusLevel = transmittalNumberDetails.errorLevel;

      if (transmittalNumberDetails.existenceRegex !== undefined) {
        checkingNumber = changeRequest.transmittalNumber.match(
          transmittalNumberDetails.existenceRegex
        )[0];
      }

      ChangeRequestDataApi.packageExists(checkingNumber)
        .then((dupID) => {
          if (!dupID && transmittalNumberDetails.idMustExist) {
            if (transmittalNumberDetails.errorLevel === "error") {
              newMessage.statusMessage = `According to our records, this ${transmittalNumberDetails.idLabel} does not exist. Please check the ${transmittalNumberDetails.idLabel} and try entering it again.`;
            } else {
              newMessage.statusMessage = `${transmittalNumberDetails.idLabel} not found. Please ensure you have the correct ${transmittalNumberDetails.idLabel} before submitting. Contact the MACPro Help Desk (code: OMP002) if you need support.`;
            }
          } else if (dupID && !transmittalNumberDetails.idMustExist) {
            if (transmittalNumberDetails.errorLevel === "error") {
              newMessage.statusMessage = `According to our records, this ${transmittalNumberDetails.idLabel} already exists. Please check the ${transmittalNumberDetails.idLabel} and try entering it again.`;
            } else {
              newMessage.statusMessage = `Please ensure you have the correct ${transmittalNumberDetails.idLabel} before submitting.  Contact the MACPro Help Desk (code: OMP003) if you need support.`;
            }
          }
          setTransmittalNumberStatusMessage(newMessage);
        })
        .catch((error) => {
          console.log("There was an error submitting a request.", error);
        });
    } else {
      setTransmittalNumberStatusMessage(newMessage);
    }

    setWaiverAuthorityErrorMessage(waiverAuthorityMessage);
    setActionTypeErrorMessage(actionTypeMessage);
  }, [
    changeRequest,
    firstTimeThrough,
    formInfo,
    transmittalNumberDetails,
    validateTransmittalNumber,
  ]);

  /**
   * Cancel Form.
   * @param {Object} event the click event
   *
   * confirm dialog with a Yes No Buttons
   */
  async function handleCancel(event) {
    event.preventDefault();
    const cancel = window.confirm("If you leave this page, you will lose your progress on this form. Are you sure you want to proceed?")
    if (cancel === true) {
      history.goBack();
    }
  }

  /**
   * Submit the new change request.
   * @param {Object} event the click event
   */
  async function handleSubmit(event) {
    event.preventDefault();
    let mounted = true;
    let newAlertCode = "NONE";

    // in case form validation takes a while (external validation)
    if (mounted) setIsLoading(true);
    if (mounted) setFirstTimeThrough(false);

    if (
      (transmittalNumberStatusMessage.statusLevel === "error" &&
        transmittalNumberStatusMessage.statusMessage) ||
      actionTypeErrorMessage ||
      waiverAuthorityErrorMessage
    )
      newAlertCode = RESPONSE_CODE.DATA_MISSING;
    else if (!areUploadsReady) {
      newAlertCode = RESPONSE_CODE.ATTACHMENTS_MISSING;
    } else {
      try {
        const uploadRef = uploader.current;
        const uploadedList = await uploadRef.uploadFiles();
        try {
          const returnCode = await ChangeRequestDataApi.submit(
            changeRequest,
            uploadedList
          );
          newAlertCode = returnCode;

          if (newAlertCode === RESPONSE_CODE.SUCCESSFULLY_SUBMITTED) {
            mounted = false;
            history.push({
              pathname: ROUTES.DASHBOARD,
              state: {
                passCode: RESPONSE_CODE.SUCCESSFULLY_SUBMITTED,
              },
            });
          }
        } catch (err) {
          newAlertCode = RESPONSE_CODE.SYSTEM_ERROR;
          console.log("submit caught error: ", err);
        }
      } catch (err) {
        newAlertCode = RESPONSE_CODE.SYSTEM_ERROR;
        console.log("uploadFiles() caught error: ", err);
      }
    }

    if (mounted) setAlertCode(newAlertCode);
    if (mounted) setIsLoading(false);

    // if the same alert persists, AlertBar doesn't know to assert itself
    var elmnt = document.getElementById("alert-bar");
    if (elmnt) elmnt.scrollIntoView({ behavior: "smooth" });
  }

  // Render the component conditionally when NOT in read only mode
  // OR in read only mode when change request data was successfully retrieved
  return (
    <LoadingScreen isLoading={isLoading}>
      <PageTitleBar heading={formInfo.pageTitle} text="" />
      <AlertBar alertCode={alertCode} />
      <div className="form-container">
        {formInfo.subheaderMessage && (
          <div className="form-subheader-message">
            {formInfo.subheaderMessage}
          </div>
        )}
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
                errorMessage={!firstTimeThrough ? actionTypeErrorMessage : ""}
                value={changeRequest.actionType}
                onChange={handleActionTypeChange}
              />
            )}
            {formInfo.waiverAuthority && (
              <RequiredChoice
                fieldInfo={formInfo.waiverAuthority}
                label="Waiver Authority"
                errorMessage={
                  !firstTimeThrough ? waiverAuthorityErrorMessage : ""
                }
                value={changeRequest.waiverAuthority}
                onChange={handleInputChange}
              />
            )}
            <TransmittalNumber
              idLabel={transmittalNumberDetails.idLabel}
              hintText={transmittalNumberDetails.idHintText}
              idFAQLink={transmittalNumberDetails.idFAQLink}
              statusLevel={transmittalNumberStatusMessage.statusLevel}
              statusMessage={transmittalNumberStatusMessage.statusMessage}
              value={changeRequest.transmittalNumber}
              onChange={(event) =>
                handleTransmittalNumberChange(event.target.value.toUpperCase())
              }
            />
          </div>
          <h3>Attachments</h3>
          <FileUploader
            ref={uploader}
            requiredUploads={formInfo.requiredUploads}
            optionalUploads={formInfo.optionalUploads}
            readyCallback={uploadsReadyCallbackFunction}
            showRequiredFieldErrors={!firstTimeThrough}
          ></FileUploader>
          <div className="summary-box">
            <TextField
              name="summary"
              label="Additional Information"
              fieldClassName="summary-field"
              multiline
              onChange={handleInputChange}
              value={changeRequest.summary}
            ></TextField>
          </div>
          <input type="submit" className="form-submit" value="Submit" />
          <button
              onClick={handleCancel}
              className="submission-form-cancel-button"
              type="button"
          >
            Cancel
          </button>
        </form>
      </div>
    </LoadingScreen>
  );
};

SubmissionForm.propTypes = {
  formInfo: PropTypes.object.isRequired,
  changeRequestType: PropTypes.string.isRequired,
};

export default SubmissionForm;
