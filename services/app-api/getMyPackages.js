import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
import {
  RESPONSE_CODE,
  getActiveTerritories,
  getUserRoleObj,
} from "cmscommonlib";
import { getUser } from "./getUser";

/**
 * Gets all packages from the DynamoDB one table
 * that correspond to the user's active access to states/territories
 */

export const getMyPackages = async (email, group) => {
  if (!email) return RESPONSE_CODE.USER_NOT_FOUND;
  if (!group) return RESPONSE_CODE.DATA_MISSING;

  return getUser(email)
    .then((user) => {
      if (!user) throw RESPONSE_CODE.USER_NOT_AUTHORIZED;

      const userRoleObj = getUserRoleObj(user?.roleList);

      territoryList = getActiveTerritories(user?.roleList);
      if (!userRoleObj.canAccessDashboard || territoryList === []) {
        throw RESPONSE_CODE.USER_NOT_AUTHORIZED;
      }

      const baseParams = {
        TableName: process.env.oneMacTableName,
        IndexName: "GSI1",
        ExclusiveStartKey: null,
        ScanIndexForward: false,
        ProjectionExpression:
          "componentId,componentType,currentStatus,submissionTimestamp,submitterName,submitterEmail,submissionId,submitterId,clockEndTimestamp,expirationTimestamp,children",
      };
      const grouppk = "OneMAC#" + group;
      let paramList = [];
      if (territoryList[0] !== "N/A") {
        paramList = territoryList.map((territory) => {
          return {
            ...baseParams,
            KeyConditionExpression: "GSI1pk = :pk AND begins_with(GSI1sk,:t1)",
            ExpressionAttributeValues: {
              ":pk": grouppk,
              ":t1": territory,
            },
          };
        });
      } else {
        paramList = [
          {
            ...baseParams,
            KeyConditionExpression: "GSI1pk = :pk",
            ExpressionAttributeValues: {
              ":pk": grouppk,
            },
          },
        ];
      }

      return Promise.all(
        paramList.map(async (params) => {
          const promiseItems = [];
          do {
            const results = await dynamoDb.query(params);
            promiseItems.push(...results.Items);
            params.ExclusiveStartKey = results.LastEvaluatedKey;
          } while (params.ExclusiveStartKey);
          return promiseItems;
        })
      ).then((values) => {
        return values.flat();
      });
    })
    .catch((error) => {
      console.log("error is: ", error);
      return error;
    });
};

// get the approver list for a rols and possibly a territory
export const main = handler(async (event) => {
  return await getMyPackages(
    event?.queryStringParameters?.email,
    event?.queryStringParameters?.group
  );
});
