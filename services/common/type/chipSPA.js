export const chipSPA = {
  packageGroup: "spa",
  componentType: "chipspa",
  typeLabel: "CHIP SPA",
  idType: "spa",
  idLabel: "SPA ID",
  idRegex:
    "(^[A-Z]{2}-[0-9]{2}-[0-9]{4}-[a-zA-Z0-9]{1,4}$)|(^[A-Z]{2}-[0-9]{2}-[0-9]{4}$)",
  idExistValidations: [
    {
      idMustExist: false,
      errorLevel: "error",
    },
  ],
  allowMultiplesWithSameId: false,
  requiredAttachments: [
    "Current State Plan",
    "Amended State Plan Language",
    "Cover Letter",
  ],
  optionalAttachments: [
    "Budget Documents",
    "Public Notice",
    "Tribal Consultation",
    "Other",
  ],
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
};
