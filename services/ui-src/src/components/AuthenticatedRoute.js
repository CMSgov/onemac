import React, {useEffect, useState} from "react";
import { Route, useHistory } from "react-router-dom";
import { useAppContext } from "../libs/contextLib";
import ChangeRequestDataApi from "../utils/ChangeRequestDataApi";
import { ROUTES, ROLE_ACL  } from "cmscommonlib";
import Home from "../containers/Home";

export default function AuthenticatedRoute({ children, ...rest }) {
  const { isAuthenticated, userProfile } = useAppContext();
  const [allowedRoute, setAllowedRoute] = useState({ });
  const history = useHistory();

  async function validateUserRoute() {
    const { email } = userProfile;
    const userData = await ChangeRequestDataApi.userProfile(email);

    console.log("User Data: " + JSON.stringify(userData))
    console.log("User Profile:(" + JSON.stringify(userProfile) + ")")
    console.log("User EMAIL:(" + JSON.stringify(email) + ")")
    console.log("User ROLE: " + JSON.stringify(userData.type))
    console.log("ValidRoute:" + JSON.stringify(ROLE_ACL[userData.type]))
    setAllowedRoute(ROLE_ACL[userData.type].includes(document.location.pathname))
  }

  useEffect(() => {
    let mounted = true;

    // Drop to home if user not logged in
    if (!isAuthenticated && mounted) {
      history.push(ROUTES.HOME);
    } else {
      // Get user data from the user table
      // and add to the user profile.
      // Note that userData comes back as an empty object if there is none.
      validateUserRoute();
    }
    return function cleanup() {
      mounted = false;
    }
  });

  if (allowedRoute) {
    return <Route {...rest}>{isAuthenticated ? children : <div></div>}</Route>;
  } else {
    return <Route {...rest}><Home /></Route>
  }
}
