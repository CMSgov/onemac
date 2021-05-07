import config from "../utils/config";
import { helpDeskContact } from "./helpDeskContact"

/**
 * Alert types
 */
export const ALERT_TYPES = {
  INFO: null, // Per CMS Design System
  WARNING: "warn",
  ERROR: "error",
  SUCCESS: "success",
};

/**
 * List of alert messages for the application.
 */
export const ALERTS_MSG = {
  // DOn't show
  NONE: {
    type: ALERT_TYPES.SUCCESS,
    heading: "",
    text: "",
  },

  // Success
  SUBMISSION_SUCCESS: {
    type: ALERT_TYPES.SUCCESS,
    heading: "Submission Completed",
    text: "Your submission has been received.",
  },

  // Success woth Survey Link
  SUBMISSION_SUCCESS_SURVEY: {
    type: ALERT_TYPES.SUCCESS,
    heading: "Submission Completed",
    text: "Thanks for your submission. We truly value your feedback. Please consider taking our <a href=\"https://forms.gle/qcsWMaDroBkhT7rs6\" target=\"_blank\" rel=\"noopener noreferrer\">Post-Submission Survey.</a>",
  },

  // Errors and warnings
  DASHBOARD_LIST_FETCH_ERROR: {
    type: ALERT_TYPES.ERROR,
    heading: "Unable to Fetch Your Submissions",
    text:
      "There was an error fetching your list of submissions.  Please reload the page and try again.",
  },
  FETCH_ERROR: {
    type: ALERT_TYPES.ERROR,
    heading: "Data Retrieval Error",
    text:
      "We encountered an error while fetching your data.  Please reload the page and try again.",
  },
  SUBMISSION_ERROR: {
    type: ALERT_TYPES.ERROR,
    heading: "Submission Error",
    text: "There was an issue submitting your request. Please try again.",
  },
  SUBMISSION_DUPLICATE_ID: {
    type: ALERT_TYPES.ERROR,
    heading: "Duplicate ID",
    text: "According to our records, this ID already exists. Please check the ID and try entering it again.",
  },
  SUBMISSION_TERRITORY_ERROR: {
    type: ALERT_TYPES.ERROR,
    heading: "Territory Error",
    text: "The Transmittal ID Territory/State is not Valid Please check the Transmittal ID and try entering it again.",
  },
  SUBMISSION_ID_NOT_FOUND: {
    type: ALERT_TYPES.ERROR,
    heading: "ID Not Found",
    text: "We could not find that ID in our system, please try again.",
  },
  WAIVER_RENEWAL_NO_ID: {
    type: ALERT_TYPES.ERROR,
    heading: "Waiver Action Error",
    text: "Waiver Renewal Action requires existing ID",
  },
  WAIVER_AMENDMENT_NO_ID: {
    type: ALERT_TYPES.ERROR,
    heading: "Waiver Action Error",
    text:"Waiver Amendment actions require existing ID",
  },
  WAIVER_NEED_ID_FOR_K: {
    type: ALERT_TYPES.ERROR,
    heading: "Waiver Action Error",
    text:"Amendment K actions must have existing IDs",
  },
  WAIVER_NEW_NOT_K: {
    type: ALERT_TYPES.ERROR,
    heading: "Waiver Action Error",
    text:"New Waiver Actions (other than Amendment Ks) require new IDs",
  },
  WAIVER_ACTION_UNKNOWN: {
    type: ALERT_TYPES.ERROR,
    heading: "Waiver Action Error",
    text:"This Waiver Action cannot be validated",
  },
  SUBMISSION_INCOMPLETE: {
    type: ALERT_TYPES.ERROR,
    heading: "There was a problem submitting your form.",
    text: "Please review the highlighted items below before resubmitting.",
  },
  REQUIRED_UPLOADS_MISSING: {
    type: ALERT_TYPES.ERROR,
    heading: "Missing Required Attachments",
    text: "Please attach the required documents before resubmitting.",
  },
  LOGIN_ERROR: {
    type: ALERT_TYPES.ERROR,
    heading: "Login Error",
    text: "We were unable to log you in with the credentials you provided. Please try to login again.",
  },
  ATTACHMENT_TOO_LARGE: {
    type: ALERT_TYPES.ERROR,
    heading: "Attachment Too Large",
    text: `An individual attachment cannot exceed ${config.MAX_ATTACHMENT_SIZE_MB} MB in size.  Please select a smaller file.`,
  },
  NOT_AUTHENTICATED: {
    type: ALERT_TYPES.WARNING,
    heading: "Login Required",
    text: "You need to be signed in to your account to access this page. Please login and try again.",
  },
  CONTACT_HELP_DESK: {
    type: ALERT_TYPES.ERROR,
    heading: "System Submission Error",
    text: `Please contact the Helpdesk ${helpDeskContact.email} or ${helpDeskContact.phone} for additional support.`,
  },
  USER_STATUS_GRANTED: {
    type: ALERT_TYPES.SUCCESS,
    heading: "Status Change",
    text: `$personalize$ has been granted access, a notification has been sent to their email.`,
  },
  USER_STATUS_DENIED: {
    type: ALERT_TYPES.SUCCESS,
    heading: "Status Change",
    text: `$personalize$ has been denied access, a notification has been sent to their email.`,
  },
  USER_STATUS_REVOKED: {
    type: ALERT_TYPES.SUCCESS,
    heading: "Status Change",
    text: `$personalize$'s access has been revoked, a notification has been sent to their email.`,
  }
};
