import { getFormConfigByTypeAndAuthority } from "cmscommonlib";

import handler from "../libs/handler-lib";
import { submitAny } from "./submitAny";
import {
  defaultFormConfig,
  defaultParentId,
  defaultParentType,
  defaultWaiverAuthoritySchema,
  waiverRAIText,
} from "./defaultFormConfig";

export const waiverRAIResponseFormConfig = {
  ...defaultFormConfig,
  appendToSchema: {
    parentId: defaultParentId,
    parentType: defaultParentType,
    waiverAuthority: defaultWaiverAuthoritySchema,
  },
  closingRemarks: waiverRAIText,
};

export const main = handler(async (event) => {
  //get waiver type and construct proper config
  console.log("here in submit 1");
  let data;
  try {
    data = JSON.parse(event.body);
  } catch (error) {
    console.log("event couldn't parse: ", error);
    throw error;
  }
  const formConfig = {
    ...waiverRAIResponseFormConfig,
    ...getFormConfigByTypeAndAuthority(data.parentType, data.waiverAuthority),
  };
  console.log("here in submit 3");
  return submitAny(event, formConfig);
});
