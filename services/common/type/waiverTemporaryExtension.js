import { Validate } from "../index.js";
export const waiverTemporaryExtension = {
  componentType: "waiverextension",
  typeLabel: "Waiver Extension",
  idType: "waiver",
  idLabel: "Waiver Number",
  idRegex: "^[A-Z]{2}[-][0-9]{4,5}.R[0-9]{2}[.]TE[0-9]{2}$",
  idExistValidations: [
    {
      idMustExist: false,
      errorLevel: "error",
    },
    {
      idMustExist: true,
      errorLevel: "warn",
      validateParentId: true,
    },
  ],
  allowMultiplesWithSameId: false,
  requiredAttachments: ["Waiver Extension Request"],
  optionalAttachments: ["Other"],
  requiredUploads: ["Waiver Extension Request"],
  optionalUploads: ["Other"],
  getParentInfo: (myId) => Validate.getParentWaiver(myId),
};
