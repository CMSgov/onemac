export const waiverRenewal = {
  componentType: "waiverrenewal",
  packageGroup: "waiver",
  typeLabel: "1915(b) Waiver Renewal",
  idType: "waiver",
  idLabel: "1915(b) Waiver Renewal Number",
  idRegex: "^[A-Z]{2}[.-][0-9]{4,5}.R(0[1-9]|[1-9][0-9]).00$",
  idExistValidations: [
    {
      idMustExist: false,
      errorLevel: "error",
    },
  ],
  allowMultiplesWithSameId: false,
  requiredAttachments: [],
  optionalAttachments: [
    "1915(b)(4) FFS Selective Contracting (Streamlined) waiver application pre-print (Initial, Renewal, Amendment)",
    "1915(b) Comprehensive (Capitated) Waiver Application Pre-print (Initial, Renewal, Amendment)",
    "1915(b) Comprehensive (Capitated) Waiver Cost effectiveness spreadsheets (Initial, Renewal, Amendment)",
    "1915(b)(4) FFS Selective Contracting (Streamlined) and 1915(b) Comprehensive (Capitated) Waiver Independent Assessment (first two renewals only)",
    "Tribal Consultation (Initial, Renewal, Amendment)",
    "Other",
  ],
  waiverAuthorities: [
    {
      label: "1915(b)(4) FFS Selective Contracting waivers",
      value: "1915(b)(4)",
    },
    { label: "All other 1915(b) Waivers", value: "1915(b)" },
  ],
  parentMustExist: true,
  allowedParentTypes: ["waivernew"],
  allowedParentStatuses: ["Approved"],
};
