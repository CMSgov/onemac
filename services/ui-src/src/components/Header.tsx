import React, { RefObject, useState, useEffect, useRef } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Auth } from "aws-amplify";
import { AwsCognitoOAuthOpts } from "@aws-amplify/auth/lib-esm/types/Auth";
import { Button } from "@cmsgov/design-system";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faUserEdit,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

import { ROUTES, getUserRoleObj } from "cmscommonlib";
import { getCurrentRoute } from "../utils/routeUtils";
import config from "../utils/config";
import { Alert, UsaBanner } from "@cmsgov/design-system";
import { isIE } from "react-device-detect";
import { useAppContext } from "../libs/contextLib";
import oneMacLogo from "../assets/images/OneMAC_logoLight.svg";
import { ROUTES as RouteList } from "cmscommonlib";
import HamburgerMenu from "../components/HamburgerMenu.js";

/**
 * Get the sign in URL used with OKTA.
 * @returns the signin URL
 */
export function getSignInUrl() {
  const authConfig = Auth.configure();
  const { domain, redirectSignIn, responseType } =
    authConfig.oauth as AwsCognitoOAuthOpts;
  const clientId = authConfig.userPoolWebClientId;
  const url = `https://${domain}/oauth2/authorize?identity_provider=Okta&redirect_uri=${redirectSignIn}&response_type=${responseType}&client_id=${clientId}`;
  return url;
}

/**
 * Get the register URL depending on the current domain.
 * @returns the register URL
 */
function getRegisterUrl() {
  const currentDomain = window.location.hostname;
  let registerUrl = "https://test.home.idm.cms.gov/";

  // TODO remove the 'spa.cms.gov' and 'spa-val.cms.gov' as options
  // after the rebrand has changed the domain to onemac
  if (currentDomain === "onemac.cms.gov" || currentDomain === "spa.cms.gov") {
    registerUrl = "https://home.idm.cms.gov/";
  } else if (
    currentDomain === "onemacval.cms.gov" ||
    currentDomain === "spa-val.cms.gov"
  ) {
    registerUrl = "https://impl.home.idm.cms.gov/";
  }

  return registerUrl;
}

/**
 * Logout the user.
 */
function logout(isLoggedInAsDeveloper?: boolean) {
  const authConfig = Auth.configure();
  Auth.signOut();
  if (isLoggedInAsDeveloper) {
    window.location.replace(
      (authConfig.oauth as AwsCognitoOAuthOpts).redirectSignOut
    );
  } else {
    window.location.href = getRegisterUrl();
  }
}

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(
  ref: RefObject<HTMLElement>,
  setShowMenu: (status: boolean) => void
) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    const handleClickOutside = (event: MouseEvent): void => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setShowMenu]);
}

/**
 * Renders account related buttons based on whether the user is authenticated or not authenticated
 */
const AccountButtons: React.FC<{
  showMenu: boolean;
  setShowMenu: (newValue: boolean) => void;
}> = ({ showMenu, setShowMenu }) => {
  const history = useHistory();
  const { isAuthenticated, isLoggedInAsDeveloper, userProfile } =
    useAppContext() ?? {};

  if (!isAuthenticated) {
    return (
      <>
        <Button href={getRegisterUrl()} inversed className="register-link">
          Register
        </Button>
        <Button href={getSignInUrl()} id="loginBtn" inversed>
          Login
        </Button>
        {config.ALLOW_DEV_LOGIN === "true" && (
          <div className="dev-login">
            <Button
              id="devloginBtn"
              onClick={() => history.push(ROUTES.DEVLOGIN)}
              inversed
            >
              Development Login
            </Button>
          </div>
        )}
      </>
    );
  }

  const buttonContents: {
    logout: JSX.Element;
    profile?: JSX.Element;
    signup?: JSX.Element;
  } = {
    logout: (
      <>
        <FontAwesomeIcon icon={faSignOutAlt} />
        &nbsp; Log out
      </>
    ),
  };

  if (userProfile?.userData) {
    // users who already have a role
    buttonContents.profile = (
      <>
        <FontAwesomeIcon icon={faUserEdit} />
        &nbsp; Manage Profile
      </>
    );
  } else if (!userProfile?.cmsRoles) {
    // users from CMS who are in the "default" role
    buttonContents.signup = (
      <>
        <FontAwesomeIcon icon={faUserPlus} />
        &nbsp; Request OneMAC Role
      </>
    );
  }

  // state users who have not yet requested a role
  if (!buttonContents.signup && !buttonContents.profile) {
    return (
      <Button
        inversed
        href={ROUTES.HOME}
        id="logoutLink"
        onClick={() => {
          logout(isLoggedInAsDeveloper);
        }}
      >
        {buttonContents.logout}
      </Button>
    );
  }

  return (
    <>
      <button
        className="dropdown"
        id="myAccountLink"
        onClick={() => setShowMenu(!showMenu)}
      >
        My Account&nbsp;
        <svg
          width="11"
          height="9"
          viewBox="0 0 11 5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.66016 4.52295L0.660156 0.0229473L10.6602 0.0229473L5.66016 4.52295Z"
            fill="white"
          ></path>
        </svg>
      </button>
      {showMenu && (
        <div className="dropdown-content">
          {buttonContents.profile && (
            <Link
              to={ROUTES.PROFILE}
              id="manageAccountLink"
              onClick={() => setShowMenu(false)}
            >
              {buttonContents.profile}
            </Link>
          )}
          {buttonContents.signup && (
            <Link
              to={ROUTES.SIGNUP}
              id="requestRoleLink"
              onClick={() => setShowMenu(false)}
            >
              {buttonContents.signup}
            </Link>
          )}
          <Link
            to={ROUTES.HOME}
            id="logoutLink"
            onClick={() => {
              setShowMenu(false);
              logout(isLoggedInAsDeveloper);
            }}
          >
            {buttonContents.logout}
          </Link>
        </div>
      )}
    </>
  );
};

/**
 * Component containing header
 * @param {Object} props - component properties
 */
export function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const { isAuthenticated, isLoggedInAsDeveloper, userProfile } =
    useAppContext() ?? {};

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setShowMenu);

  /**
   * Renders a navigation bar
   */

  function renderNavBar(
    isLoggedInAsDeveloper: boolean | undefined,
    currentRoute: string,
    isAuthenticated: boolean | undefined
  ) {
    const userObj = getUserRoleObj(userProfile?.userData?.roleList);

    const homeLink = (
      <Link
        to={ROUTES.HOME}
        className={getActiveClass(currentRoute, RouteList.HOME)}
      >
        Home
      </Link>
    );

    // Target new ensures FAQ opens in new window.
    const faq = (
      <a
        href={ROUTES.FAQ}
        className={getActiveClass(currentRoute, RouteList.FAQ_TOP)}
        target="_blank"
        rel="noreferrer noopener"
      >
        FAQ
      </a>
    );

    const dashboardLink = (
      <Link
        id="dashboardLink"
        to={ROUTES.DASHBOARD}
        className={getActiveClass(currentRoute, RouteList.DASHBOARD)}
      >
        Dashboard
      </Link>
    );

    const userManagementLink = (
      <Link
        id="userManagementLink"
        to={ROUTES.USER_MANAGEMENT}
        className={getActiveClass(currentRoute, RouteList.USER_MANAGEMENT)}
      >
        User Management
      </Link>
    );

    const packageListLink = (
      <Link
        id="packageListLink"
        to={ROUTES.PACKAGE_LIST}
        className={getActiveClass(currentRoute, RouteList.PACKAGE_LIST)}
      >
        Packages
      </Link>
    );

    let linksToDisplay = [homeLink];
    if (isAuthenticated) {
      if (userObj.canAccessDashboard) {
        linksToDisplay.push(dashboardLink);
      }
      if (userObj.canAccessDashboard && isLoggedInAsDeveloper) {
        linksToDisplay.push(packageListLink);
      }
      if (userObj.canAccessUserManagement) {
        linksToDisplay.push(userManagementLink);
      }
    }
    // This is to ensure FAQ shows up last in the link order.
    linksToDisplay.push(faq);

    switch (document.location.pathname) {
      case ROUTES.FAQ:
      case ROUTES.FAQ + "/":
        return (
          <div className="nav-bar">
            <div className="header-wrapper">
              <div className="nav-left-faq">
                <img id="oneMacLogo" alt="OneMac Logo" src={oneMacLogo} />
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="nav-bar">
            <div className="header-wrapper">
              <HamburgerMenu linksToDisplay={linksToDisplay} />
              <div className="nav-left">
                <img id="oneMacLogo" alt="OneMac Logo" src={oneMacLogo} />
                <div className="nav-left-links">
                  {linksToDisplay.map((link, index) => {
                    return <div key={index}>{link}</div>;
                  })}
                </div>
              </div>
              <div className="nav-right" ref={wrapperRef}>
                <AccountButtons showMenu={showMenu} setShowMenu={setShowMenu} />
              </div>
            </div>
          </div>
        );
    }
  }

  const getActiveClass = (currentRoute: string, targetRoute: string) =>
    currentRoute === targetRoute.split("/")[1].toUpperCase()
      ? "activeLink"
      : "ds-u-text-decoration--none";

  return (
    <>
      <div className="usa-banner-custom">
        <UsaBanner />
      </div>
      {isIE && (
        <Alert variation="error" heading="Internet Explorer Browser Issues">
          Please consider upgrading to a recommended browser. Internet Explorer
          may have functionality issues and we recommend using another browser
          to access the system. Check out the <a href="/FAQ"> FAQ page</a> for a
          list of recommended browsers.”
        </Alert>
      )}
      {renderNavBar(
        isLoggedInAsDeveloper,
        getCurrentRoute(useLocation().pathname),
        isAuthenticated
      )}
    </>
  );
}
