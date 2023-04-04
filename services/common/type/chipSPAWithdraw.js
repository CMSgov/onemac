export const chipSPAWithdraw = {
  componentType: "chipspawithdraw",
  typeLabel: "CHIP SPA Withdraw Request",
  idLabel: "SPA ID",
  idRegex:
    "(^[A-Z]{2}-[0-9]{2}-[0-9]{4}-[a-zA-Z0-9]{1,4}$)|(^[A-Z]{2}-[0-9]{2}-[0-9]{4}$)",
  idMustExist: true,
  allowMultiplesWithSameId: true,
  requiredAttachments: [],
  optionalAttachments: ["Upload Supporting Documentation"],
  theAttributes: [
    "componentId",
    "submissionTimestamp",
    "currentStatus",
    "attachments",
    "additionalInformation",
    "submitterName",
    "submitterEmail",
  ],
  allowedParentTypes: ["chipspa"],
  allowedParentStatuses: [
    "Pending",
    "Pending - Concurrence",
    "Pending - Approval",
    "RAI Issued",
  ],
};
