export const RESPONSE_CODE: Record<string, string>;
export const ROUTES: Record<string, string>;
export enum USER_STATUS {
  ACTIVE = "active",
  PENDING = "pending",
  DENIED = "denied",
  REVOKED = "revoked",
}
export enum USER_TYPE {
  STATE_SUBMITTER = "statesubmitter",
  CMS_REVIEWER = "cmsreviewer",
  STATE_ADMIN = "statesystemadmin",
  CMS_ROLE_APPROVER = "cmsroleapprover",
  SYSTEM_ADMIN = "systemadmin",
  HELPDESK = "helpdesk",
}

export class UserRole {
  canAccessDashboard: boolean;
  canAccessForms: boolean;
  canAccessMetrics: boolean;
  canAccessUserManagement: boolean;
  canDownloadCsv: boolean;
}

export const getUserRoleObj: (
  role: USER_TYPE | undefined,
  isEua?: boolean,
  attributes?: unknown[]
) => UserRole;

export const latestAccessStatus: (
  userData: Record<string, unknown> | undefined,
  territory: string
) => USER_STATUS;

type SelectOption = { label: string; value: string };

export namespace ChangeRequest {
  type TransmittalNumberInfo = {
    idLabel: string;
    idRegex: string;
    idFormat: string;
    idHintText: string;
    idFAQLink: string;
    idExistValidations: {
      existenceRegex?: RegExp;
      idMustExist?: boolean;
      errorLevel: string;
    }[];
  };

  type WaiverFormInfo = {
    actionType: { optionsList: SelectOption[] };
    waiverAuthority: { optionsList: SelectOption[] };
    newTransmittalNumber: TransmittalNumberInfo;
    amendmentTransmittalNumber: TransmittalNumberInfo;
    renewalTransmittalNumber: TransmittalNumberInfo;
  };

  export type FormInfo = {
    pageTitle: string;
    subheaderMessage?: { __html: string };
    detailsHeader?: string;
    transmittalNumber: TransmittalNumberInfo;
    requiredUploads: unknown;
    optionalUploads: unknown;
  } & Partial<WaiverFormInfo>;

  export const CONFIG: Record<string, FormInfo>;
  export const TYPE: Record<string, string>;
}
