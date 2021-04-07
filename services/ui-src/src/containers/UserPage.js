import React, { useEffect, useState } from "react";
import { Review } from "@cmsgov/design-system";
import { ROLES, latestAccessStatus } from "cmscommonlib";

import { useAppContext } from "../libs/contextLib";
import { userTypes } from "../libs/userLib";
import { helpDeskContact } from "../libs/helpDeskContact";
import PageTitleBar from "../components/PageTitleBar";
import UserDataAPI from "../utils/UserDataApi";

/**
  * Formats multi-part name into single full name
  */
const getFullName = (...names) => names.filter(Boolean).join(" ");

const ROLE_TO_APPROVER_LABEL = {
  [ROLES.STATE_USER]: "State Admin",
  [ROLES.STATE_ADMIN]: "CMS Role Approver",
  [ROLES.CMS_APPROVER]: "CMS System Admin",
};

const ContactList = ({ contacts, userType }) => {
  let label = ROLE_TO_APPROVER_LABEL[userType] ?? "Contact";

  if (!contacts) return null;
  if (contacts.length > 1) label += "s";

  return (
    <p>
      <b>{label}:</b>{" "}
      {contacts.map(({ firstName, lastName, email }, idx) => (
        <React.Fragment key={email}>
          <a href={`mailto:${email}`}>{getFullName(firstName, lastName)}</a>
          {idx < contacts.length - 1 && ", "}
        </React.Fragment>
      ))}
    </p>
  );
};

const transformAccesses = (user = {}) => {
  switch (user.type) {
    case ROLES.STATE_USER:
    case ROLES.STATE_ADMIN:
      return user.attributes?.map(({ stateCode }) => ({
        state: stateCode,
        status: latestAccessStatus(user, stateCode),
      }));

    case ROLES.CMS_ROLE_APPROVER:
    case ROLES.SYSTEM_ADMIN:
      return [];

    default:
      return [];
  }
};

/**
 * Component housing data belonging to a particular user
 */
const UserPage = () => {
  const { userProfile } = useAppContext();
  const { email, firstName, lastName, userData } = userProfile;

  const [accesses, setAccesses] = useState(transformAccesses(userData));

  let userType = "user";
  if (userData && userData.type) {
    userType = userTypes[userData.type];
  }

  useEffect(() => {
    (async () => {
      try {
        const adminsByState = await UserDataAPI.getStateAdmins(
          userData.attributes.map(({ stateCode }) => stateCode).filter(Boolean)
        );

        setAccesses(
          transformAccesses(userData).map((access) => ({
            ...access,
            contacts: adminsByState[access.state],
          }))
        );
      } catch (e) {
        console.error(e);
      }
    })();
  }, [userData]);

  return (
    <div>
      <PageTitleBar heading="Account Management" />
      <div className="profile-container">
        <div className="subheader-message">
          Below is the account information for your role as a {userType}. Your
          name and email cannot be edited in OneMAC. It can be changed in your
          IDM profile. If you have questions, please contact the MACPro Help
          Desk at{" "}
          <a href={`mailto:${helpDeskContact.email}`}>
            {helpDeskContact.email}
          </a>{" "}
          or call {helpDeskContact.phone}.
        </div>
        <div className="ds-l-row">
          <div className="ds-l-col--6">
            <h3>Profile Information</h3>
            <Review heading="Full Name">{getFullName(firstName, lastName)}</Review>
            <Review heading="Email">{email}</Review>
          </div>
          <div className="ds-l-col--6">
            <h3>State Access Management</h3>
            <dl className="state-access-cards">
              {accesses.map(({ state, status, contacts }) => (
                <div className="state-access-card" key={state}>
                  <dt>{state}</dt>
                  <dd>
                    <em>{status}</em>
                    <br />
                    <br />
                    <ContactList contacts={contacts} type={userType} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
