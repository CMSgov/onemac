/**
 * Routing Control Shared List
 *
 */

import { ONEMAC_TYPE } from "./workflow.js";

export const ROUTES = {
  DETAIL: "/detail",
  USER_MANAGEMENT: "/usermanagement",
  FAQ: "/FAQ",
  FAQ_ACCEPTED_FILE_TYPES: "/FAQ#acceptable-file-formats",
  FAQ_ATTACHMENTS_MED_SPA: "/FAQ#medicaid-spa-attachments",
  FAQ_ATTACHMENTS_MED_SPA_RAI: "/FAQ#medicaid-spa-rai-attachments",
  FAQ_ATTACHMENTS_CHIP_SPA: "/FAQ#chip-spa-attachments",
  FAQ_ATTACHMENTS_CHIP_SPA_RAI: "/FAQ#chip-spa-rai-attachments",
  FAQ_ATTACHMENTS_WAIVER_B: "/FAQ#waiverb-attachments",
  FAQ_ATTACHMENTS_WAIVER_B_RAI: "/FAQ#waiverb-rai-attachments",
  FAQ_ATTACHMENTS_WAIVER_B_EXT: "/FAQ#waiverb-extension-attachments",
  FAQ_ATTACHMENTS_APPK: "/FAQ#appk-attachments",
  FAQ_TOP: "/FAQ/#top",
  FAQ_SYSTEM: "/FAQ/#system",
  FAQ_SPA_ID: "/FAQ#spa-id-format",
  FAQ_INITIAL_1915B_WAIVER_ID: "/FAQ#initial-waiver-id-format",
  FAQ_1915B_WAIVER_RENEWAL_ID: "/FAQ#waiver-renewal-id-format",
  FAQ_1915B_WAIVER_AMENDMENT_ID: "/FAQ#waiver-amendment-id-format",
  FAQ_WAIVER_APP_K_ID: "/FAQ#waiver-c-id",
  FAQ_WAIVER_EXTENSION_ID: "/FAQ#waiver-extension-id-format",
  HOME: "/",
  PROFILE: "/profile",
  NEW_SUBMISSION_SELECTION: "/new",
  DEVLOGIN: "/devlogin",
  SIGNUP: "/signup",
  STATE_SIGNUP: "/signup/state",
  REVIEWER_SIGNUP: "/signup/cmsreviewer",
  ATTACHMENT_LANDING: "/legacy-attachments",
  ABP_LANDING: "/medicaid-abp",
  MEDICAID_ELIGIBILITY_LANDING: "/medicaid-eligibility",
  CHIP_ELIGIBILITY_LANDING: "/chip-eligibility",
};

export const ONEMAC_ROUTES = {
  PACKAGE_LIST: "/dashboard",
  PACKAGE_LIST_SPA: "/dashboard?startTab=spa",
  PACKAGE_LIST_WAIVER: "/dashboard?startTab=waiver",
  TRIAGE_GROUP: "/choices",
  TRIAGE_SPA: "/choices/spa",
  TRIAGE_MEDICAID_SPA: "/choices/spa/medicaid",
  TRIAGE_CHIP_SPA: "/choices/spa/chip",
  TRIAGE_WAIVER: "/choices/waiver",
  TRIAGE_WAIVER_B: "/choices/waiver-b",
  TRIAGE_WAIVER_B_4: "/choices/waiver-b-4",
  TRIAGE_WAIVER_B_OTHER: "/choices/waiver-b-other",
  MEDICAID_SPA: "/medicaid-spa",
  MEDICAID_SPA_DETAIL: "/detail/medicaid-spa",
  MEDICAID_SPA_RAI: "/medicaid-spa-rai",
  MEDICAID_SPA_WITHDRAW: "/medicaid-spa-withdraw",
  CHIP_SPA: "/chip-spa",
  CHIP_SPA_DETAIL: "/detail/chip-spa",
  CHIP_SPA_RAI: "/chip-spa-rai",
  CHIP_SPA_WITHDRAW: "/chip-spa-withdraw",
  INITIAL_WAIVER_B_4: "/initial-waiver-b-4",
  INITIAL_WAIVER_B_OTHER: "/initial-waiver-b-other",
  INITIAL_WAIVER_DETAIL: "/detail/initial-waiver",
  INITIAL_WAIVER_WITHDRAW: "/initial-waiver-withdraw",
  WAIVER_RENEWAL_B_4: "/waiver-renewal-b-4",
  WAIVER_RENEWAL_B_OTHER: "/waiver-renewal-b-other",
  WAIVER_RENEWAL_DETAIL: "/detail/waiver-renewal",
  WAIVER_RENEWAL_WITHDRAW: "/waiver-renewal-withdraw",
  WAIVER_AMENDMENT_B_4: "/waiver-amendment-b-4",
  WAIVER_AMENDMENT_B_OTHER: "/waiver-amendment-b-other",
  WAIVER_AMENDMENT_DETAIL: "/detail/waiver-amendment",
  WAIVER_AMENDMENT_WITHDRAW: "/waiver-amendment-withdraw",
  WAIVER_APP_K: "/waiver-app-k",
  WAIVER_APP_K_DETAIL: "/detail/waiver-app-k",
  WAIVER_APP_K_RAI: "/waiver-app-k-rai",
  WAIVER_APP_K_WITHDRAW: "/waiver-app-k-withdraw",
  WAIVER_RAI: "/waiver-rai",
  APPENDIX_K_AMENDMENT: "/appendix-k-amendment",
  APPENDIX_K_AMENDMENT_WITHDRAW: "/appendix-k-amendment-withdraw",
  TEMPORARY_EXTENSION: "/temporary-extension",
  TEMPORARY_EXTENSION_DETAIL: "/detail/temporary-extension",
  FORMS_DESCRIBE: "/forms-describe",
  EVENT: "/event",
};

export const TYPE_TO_DETAIL_ROUTE = {
  [ONEMAC_TYPE.CHIP_SPA]: ONEMAC_ROUTES.CHIP_SPA_DETAIL,
  [ONEMAC_TYPE.CHIP_SPA_RAI]: "",
  [ONEMAC_TYPE.MEDICAID_SPA]: ONEMAC_ROUTES.MEDICAID_SPA_DETAIL,
  [ONEMAC_TYPE.MEDICAID_SPA_RAI]: "",
  [ONEMAC_TYPE.WAIVER]: ONEMAC_ROUTES.INITIAL_WAIVER_DETAIL,
  [ONEMAC_TYPE.WAIVER_RAI]: "",
  [ONEMAC_TYPE.WAIVER_INITIAL]: ONEMAC_ROUTES.INITIAL_WAIVER_DETAIL,
  [ONEMAC_TYPE.WAIVER_RENEWAL]: ONEMAC_ROUTES.WAIVER_RENEWAL_DETAIL,
  [ONEMAC_TYPE.WAIVER_AMENDMENT]: ONEMAC_ROUTES.WAIVER_AMENDMENT_DETAIL,
  [ONEMAC_TYPE.WAIVER_EXTENSION]: ONEMAC_ROUTES.TEMPORARY_EXTENSION_DETAIL,
  [ONEMAC_TYPE.WAIVER_EXTENSION_B]: ONEMAC_ROUTES.TEMPORARY_EXTENSION_DETAIL,
  [ONEMAC_TYPE.WAIVER_EXTENSION_C]: ONEMAC_ROUTES.TEMPORARY_EXTENSION_DETAIL,
  [ONEMAC_TYPE.WAIVER_APP_K]: ONEMAC_ROUTES.WAIVER_APP_K_DETAIL,
};
