import { USER_TYPE } from "cmscommonlib";
import { getCurrentStatus } from "./user-util";

/**
 * Helpdesk User specific functions.
 *
 * all Helpdesk User can view all Users except CMS System Admins
 *
 * @class
 */
class Helpdesk {
  /**
   * Help Desk users see all users
   * @returns {String} the User Role
   */
  getScanParams() {
    const scanParams = {
      TableName: process.env.userTableName,
      FilterExpression: "#ty <> :userType",
      ExpressionAttributeNames: { "#ty": "type" },
      ExpressionAttributeValues: { ":userType": USER_TYPE.SYSTEM_ADMIN },
    };
    return scanParams;
  }

  /**
   * Helpdesk User do NOT have a state
   * @returns {Boolean} false because we do not check if the states match
   */
  shouldICheckState() {
    return false;
  }

  /**
   * takes the raw user data and transforms into
   * what to send to front end.
   *
   * Helpdesk User gets all users except CMS System Admins
   *
   * @param {userResult} Array of User Objects from database
   * @returns {userRows} the list of users
   */
  transformUserList(userResult) {
    const userRows = [];
    const errorList = [];
    let i = 1;

    console.log("results:", JSON.stringify(userResult));

    // if there are no items, return an empty user list
    if (!userResult.Items) return userRows;

    userResult.Items.forEach((oneUser) => {
      // All users must have the attribute section
      if (!oneUser.attributes) {
        errorList.push(
          "Attributes data required for this role, but not found ",
          oneUser
        );
        return;
      }
      if (
        oneUser.type === "statesubmitter" ||
        oneUser.type === "statesystemadmin"
      ) {
        oneUser.attributes.forEach((oneAttribute) => {
          // State System Admins and State Submitters must have the history section
          if (!oneAttribute.history) {
            errorList.push(
              "History data required for this role, but not found ",
              oneUser
            );
            return;
          }

          userRows.push({
            id: i,
            email: oneUser.id,
            firstName: oneUser.firstName,
            lastName: oneUser.lastName,
            stateCode: oneAttribute.stateCode,
            role: oneUser.type,
            latest: getCurrentStatus(oneAttribute.history),
          });
          i++;
        });
      }
      // Helpdesk users and CMS Role Approvers must not have the history section
      else {
        userRows.push({
          id: i,
          email: oneUser.id,
          firstName: oneUser.firstName,
          lastName: oneUser.lastName,
          stateCode: "N/A",
          role: oneUser.type,
          latest: getCurrentStatus(oneUser.attributes),
        });
        i++;
      }
    });

    console.log("error List is ", errorList);

    console.log("Response:", userRows);

    return userRows;
  }
}

const instance = new Helpdesk();
Object.freeze(instance);
export default instance;
