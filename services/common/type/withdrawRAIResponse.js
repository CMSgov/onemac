export const withdrawRAIResponse = {
  componentType: "rairesponsewithdraw",
  typeLabel: "Withdraw Formal RAI Response",
  idLabel: "Package ID",
  idRegex: "(^[A-Z]{2}[.-])",
  idMustExist: true,
  allowMultiplesWithSameId: true,
  requiredAttachments: [],
  optionalAttachments: ["Supporting Documentation"],
  theAttributes: [
    "componentId",
    "submissionTimestamp",
    "currentStatus",
    "attachments",
    "additionalInformation",
    "submitterName",
    "submitterEmail",
  ],
  allowedParentTypes: [
    "medicaidspa",
    "chipspa",
    "waivernew",
    "waiverrenewal",
    "waiveramendment",
    "waiverappk",
  ],
  allowedParentStatuses: ["RAI Response Withdraw Enabled"],
};
