import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { AppContext } from "./libs/contextLib";
import { devUsers } from "./libs/devUsers";
import UserDataApi from "./utils/UserDataApi";
import Routes from "./Routes";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { isActive } from "./libs/userLib";

function App() {
  const [authState, setAuthState] = useState({
    isAuthenticating: true,
    isAuthenticated: false,
    isLoggedInAsDeveloper: false,
    userProfile: null,
    isValidRoute: false,
  });

  useEffect(() => {
    // On initial load of the App, try to set the user info.
    // It will capture info if they are logged in from a previous session.
    setUserInfo();
  }, []);

  /**
   * Gets authentication status for user,
   * gets user names and email from cognito
   * and associated user data from dynamo user table,
   * checks if user is a developer.
   * Then sets all these values in their corresponding state variables.
   * @param {Boolean} isDeveloper indicates if the user is a developer
   */
  async function setUserInfo(isDeveloper = false) {
    let userAuthenticationStatus = false;
    let isDev = false;
    let tempUserProfile;
    let isUserActive;

    try {
      // Get authenticated user's info from cognito
      // and set portion of the user profile.
      const authUser = await Auth.currentAuthenticatedUser();
      userAuthenticationStatus = true;
      tempUserProfile = {
        cmsRoles:
          authUser.signInUserSession.idToken.payload["custom:cms_roles"],
        email: authUser.signInUserSession.idToken.payload.email,
        firstName: authUser.signInUserSession.idToken.payload.given_name,
        lastName: authUser.signInUserSession.idToken.payload.family_name,
      };

      // Get user data from the user table
      // and add to the user profile.
      // Note that userData comes back as an empty object if there is none.
      const userData = await UserDataApi.userProfile(tempUserProfile.email);
      tempUserProfile.userData = userData;

      // If there's user data, then check if user is in active status.
      // System admins are active by default since they are hardcoded into the data via seeding.
      if (userData && Object.keys(userData).length > 0) {
        if (userData.type === "systemadmin") {
          isUserActive = true;
        } else {
          isUserActive = isActive(userData);
        }
      }

      // Set isDev for dev users.
      if (isDeveloper || devUsers.includes(tempUserProfile.email)) {
        isDev = true;
      }
    } catch (error) {
      if (error !== "not authenticated" || error.Message !== "SESSION_EXPIRY") {
        console.log(
          "There was an error while loading the user information.",
          error
        );
      }
    }

    setAuthState({
      isAuthenticating: false,
      isAuthenticated: userAuthenticationStatus,
      isUserActive: isUserActive,
      isLoggedInAsDeveloper: isDev,
      userProfile: tempUserProfile,
    });
  }

  /**
   * Updates phone number in the user profile,
   * @param {string} phoneNumber is used to update the user profile
   */
  async function updatePhoneNumber(phoneNumber) {
    setAuthState({
      ...authState,
      userProfile: {
        ...authState.userProfile,
        userData: {
          ...authState.userProfile.userData,
          phoneNumber: phoneNumber,
        },
      },
    });
  }

  return (
    !authState.isAuthenticating && (
      <AppContext.Provider
        value={{
          ...authState,
          setUserInfo,
          updatePhoneNumber,
        }}
      >
        <div className="header-and-content">
          <Header />
          <Routes />
        </div>
        <Footer />
      </AppContext.Provider>
    )
  );
}

export default App;
