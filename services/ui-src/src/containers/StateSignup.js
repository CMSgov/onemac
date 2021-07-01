import React, { useCallback } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { territoryList, USER_TYPE } from "cmscommonlib";

import { useSignupCallback } from "../libs/hooksLib";
import { userTypes } from "../libs/userLib";
import { MultiSelectDropDown } from "../components/MultiSelectDropDown";
import PageTitleBar from "../components/PageTitleBar";

export function StateSignup() {
  const history = useHistory();
  const {
    state: { role = "" },
  } = useLocation();

  const expandStatesToAttributes = useCallback((values) => {
    return values.map(({ value }) => ({
      stateCode: value,
      status: "pending",
    }));
  }, []);

  const [loading, onSubmit] = useSignupCallback(role, expandStatesToAttributes);

  return (
    <>
      <PageTitleBar heading="Registration: State Access" enableBackNav />
      <div className="state-signup-page">
        <div className="state-signup-container">
          <div className="signup-headings">
            <p className="role-header">User Role:</p>
            <p className="user-role">
              {userTypes[role] ?? role}
              <svg
                width="19"
                height="18"
                viewBox="0 0 19 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.06 6L12 6.94L2.92 16H2V15.08L11.06 6ZM14.66 0C14.41 0 14.15 0.1 13.96 0.29L12.13 2.12L15.88 5.87L17.71 4.04C18.1 3.65 18.1 3 17.71 2.63L15.37 0.29C15.17 0.09 14.92 0 14.66 0ZM11.06 3.19L0 14.25V18H3.75L14.81 6.94L11.06 3.19Z"
                  fill="#0071BC"
                />
              </svg>
            </p>
          </div>
          <MultiSelectDropDown
            cancelFn={() => history.replace("/signup")}
            errorMessage={
              role === USER_TYPE.STATE_SUBMITTER
                ? "Please select at least one state."
                : "Please select one state."
            }
            loading={loading}
            onlyOne={role === USER_TYPE.STATE_ADMIN}
            options={territoryList}
            placeholder="Select state here"
            required
            submitFn={onSubmit}
            title="Select your State Access"
            type="selectstate"
          />
        </div>
      </div>
    </>
  );
}
