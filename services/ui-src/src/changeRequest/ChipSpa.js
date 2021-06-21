import React from "react";
import { useParams } from "react-router-dom";
import { CHANGE_REQUEST_TYPES } from "./changeRequestTypes";
import SubmissionForm from "./SubmissionForm";
import SubmissionView from "./SubmissionView";
import { ROUTES } from "cmscommonlib";
import { commonSubheaderMessage } from "../libs/formsLib"

/**
 * Spa acts as a wrapper around SubmissionForm to render SPA-specific form
 */
const ChipSpa = () => {
  // Optional ID parameter from the URL
  const { id, userId } = useParams();

  const formInfo = {
    pageTitle: "Submit New CHIP SPA",
    readOnlyPageTitle: "CHIP SPA Submission Details",
    detailsHeader: "CHIP SPA",
    subheaderMessage: commonSubheaderMessage,
    requiredUploads: [
      "Current State Plan",
      "Amended State Plan Language",
      "Cover Letter",
    ],
    optionalUploads: [
      "Budget Documents",
      "Public Notice",
      "Tribal Consultation",
      "Other",
    ],
    transmittalNumber: {
      idType: "chipspa",
      idLabel: "SPA ID",
      idHintText: "Must follow the format SS-YY-NNNN-xxxx",
      idFAQLink: ROUTES.FAQ_SPA_ID,
      idFormat: "SS-YY-NNNN or SS-YY-NNNN-xxxx",
      idRegex:
        "(^[A-Z]{2}-[0-9]{2}-[0-9]{4}-[a-zA-Z0-9]{1,4}$)|(^[A-Z]{2}-[0-9]{2}-[0-9]{4}$)",
      idMustExist: false,
      errorLevel: "error",
    },
  };

  if (id && userId) {
    return <SubmissionView formInfo={formInfo} id={id} userId={userId} />;
  } else {
    return (
      <SubmissionForm
        formInfo={formInfo}
        changeRequestType={CHANGE_REQUEST_TYPES.CHIP_SPA}
      />
    );
  }
};

export default ChipSpa;
