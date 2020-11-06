import React from "react";
import { Link, useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
import { Button, FormLabel } from "@cmsgov/design-system";
import { ROUTES } from "../Routes";
import medicaidLogo from "../images/medicaidLogo.png";
import flagIcon from "../images/flagIcon.png";
import config from "../utils/config";
import "./Header.scss";

/**
 * Get the sign in URL used with OKTA.
 * @returns the signin URL
 */
function getSignInUrl() {
    const authConfig = Auth.configure();
    const {
        domain,
        redirectSignIn,
        responseType
    } = authConfig.oauth;
    const clientId = authConfig.userPoolWebClientId;
    const url = `https://${domain}/oauth2/authorize?identity_provider=Okta&redirect_uri=${redirectSignIn}&response_type=${responseType}&client_id=${clientId}`;
    return url;
}

/**
 * Get the sign out URL used with OKTA.
 * @returns the signout URL
 */
function getSignOutUrl() {
    const authConfig = Auth.configure();
    const {
        domain,
        redirectSignOut
    } = authConfig.oauth;
    const clientId = authConfig.userPoolWebClientId;
    const url = `https://${domain}/logout?client_id=${clientId}&redirect_uri=${redirectSignOut}`;
    return url;
}

/**
 * Component containing header
 * @param {Object} props - component properties
 */
function Header(props) {
  const history = useHistory();
  /**
   * Renders a branding bar
   */
  function renderBrandingBar() {
    return (
      <div tabIndex="0">
        <div className="usaBanner">
          <img src={flagIcon} alt="united states flag" />
          An offical website of the United States government
        </div>
        <div className="headerLogo">
          <a href="https://www.medicaid.gov/">
            <img
              src={medicaidLogo}
              alt="Medicaid.gov-Keeping America Healthy"
            />
          </a>
        </div>
      </div>
    );
  }

  /**
   * Renders account related buttons based on whether the user is authenticated or not authenticated
   */
  function renderAccountButtons() {
    let showDevLogin = config.ALLOW_DEV_LOGIN === "true";
    if (props.isAuthenticated) {
      return (
        <div className="navElements">
          <FormLabel inversed>
            <Button
              onClick={() => window.location = getSignOutUrl()}
              inversed
            >
              Logout
            </Button>
            {showDevLogin && (
              <Button
                onClick={() => {
                  Auth.signOut();
                  window.location.href =
                    window.location.protocol + "//" + window.location.hostname;
                }}
                inversed
              >
                Dev Logout
              </Button>
            )}
          </FormLabel>
        </div>
      );
    } else {
      return (
        <div className="navElements">
          <Button onClick={() => window.location = getSignInUrl()} inversed>
            Login
          </Button>
          {showDevLogin && (
            <Button onClick={() => history.push(ROUTES.DEVLOGIN)} inversed>
              Development Login
            </Button>
          )}
        </div>
      );
    }
  }

  /**
   * Renders a navigation bar
   */
  function renderNavBar() {
    return (
      <div className="navbarContainer">
        <div className="navElements">
          <Link to={ROUTES.HOME}>About</Link>
          <Link to={ROUTES.DASHBOARD}>Dashboard</Link>
          <Link to={ROUTES.FAQ}>FAQ</Link>
        </div>
        {renderAccountButtons()}
      </div>
    );
  }

  const authConfig = Auth.configure();
    console.log(authConfig.oauth);

  return (
    <div className="headerContainer">
      {renderBrandingBar()}
      {renderNavBar()}
    </div>
  );
}

export default Header;
