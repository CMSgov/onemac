import { API, Auth } from "aws-amplify";
import handleApiError from "../libs/apiErrorHandler";
/**
 * Singleton class to perform operations with the change request backend.
 */
class ChangeRequestDataApi {
  /**
   * Submit a change request to be saved by the backend.
   * @param {Object} data the change request data
   * @param {Array} uploadsList an array with the information on the already uploaded files
   * @returns the submitted change request
   */
  async submit(data, uploadsList) {
    try {
      const userAuth = await Auth.currentAuthenticatedUser();
      //Normalize the user data.
      data.user = {
        email: userAuth.signInUserSession.idToken.payload.email.toLowerCase(),
        firstName: userAuth.signInUserSession.idToken.payload.given_name,
        lastName: userAuth.signInUserSession.idToken.payload.family_name,
      };
      data.uploads = uploadsList;
    } catch (error) {
      handleApiError(
        error,
        "USER_SUBMISSION_FAILED",
        "Error while submitting the form."
      );
    }

    if (
      !data ||
      !uploadsList ||
      !data.type ||
      uploadsList.length === 0 ||
      !data.user
    ) {
      console.log(
        "Unable to submit data due to missing fields, invalid format of fields,  or uploads.",
        data,
        uploadsList
      );
      throw new Error("Missing required data or uploads");
    }

    try {
      return await API.post("oneMacAPI", "/submit", {
        body: data,
      });
    } catch (error) {
      handleApiError(
        error,
        "USER_SUBMISSION_FAILED",
        "Error while submitting the form."
      );
    }
  }

  /**
   * Fetch a specific record from the backend.
   * @param {string} id the ID of the change request to fetch
   * * @param {string} userId the ID of the submitter that created the change request
   * @return {Object} a change request
   */
  async get(id, userId) {
    if (!id || !userId) {
      console.log("ID or user ID was not specified for get API call");
      throw new Error("ID or user ID was not specified for get API call");
    }

    try {
      return await API.get("oneMacAPI", `/get/${id}/${userId}`);
    } catch (error) {
      handleApiError(
        error,
        "SUBMISSION_FETCH_ERROR",
        `There was an error fetching ID ${id}.`
      );
    }
  }

  /**
   * Check to see if an id exists in the back end
   * @param {string} id the ID to check
   * @return {Boolean} true if the ID exists in the back end
   */
  async packageExists(id) {
    if (!id) {
      console.log("ID was not specified for packageExists API call");
      throw new Error("ID was not specified for packageExists API call");
    }

    try {
      return await API.get("oneMacAPI", `/package-exists/${id}`);
    } catch (error) {
      handleApiError(
        error,
        "SUBMISSION_FETCH_ERROR",
        `There was an error fetching package with ID ${id}.`
      );
    }
  }

  /**
   * Fetch all change requests that correspond to the user's active access to states/territories
   * @param {string} email the user's email
   * @return {Promise<Array>} a list of change requests
   */
  async getAllByAuthorizedTerritories(userEmail) {
    if (!userEmail) return [];

    try {
      return await API.get(
        "oneMacAPI",
        `/getAllByAuthorizedTerritories?email=${userEmail}`
      );
    } catch (error) {
      handleApiError(
        error,
        "FETCH_ERROR",
        `There was an error fetching the states/territories for ${userEmail}.`
      );
    }
  }
}

const instance = new ChangeRequestDataApi();
Object.freeze(instance);

export default instance;
