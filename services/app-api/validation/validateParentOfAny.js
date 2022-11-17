import AWS from "aws-sdk";
import { dynamoConfig } from "cmscommonlib";

const dynamoDb = new AWS.DynamoDB.DocumentClient(dynamoConfig);

export const validateParentOfAny = async (event, config) => {
  const parentId = event.pathParameters.parentId;
  console.log("checking parent id: " + parentId);

  const parentParams = {
    TableName: process.env.oneMacTableName,
    KeyConditionExpression: "pk = :pk AND begins_with(sk,:version)",
    ExpressionAttributeValues: {
      ":pk": parentId,
      ":version": "v0#",
    },
    ProjectionExpression: "componentType, currentStatus",
  };
  const result = await dynamoDb.query(parentParams).promise();

  // no matches, no parent found
  if (!result?.Items) return false;

  console.log("Items found are: ", result.Items);

  // matches with no more specifics, parent is found
  if (!config.allowedParentTypes && !config.allowedParentStatuses) return true;

  // loop through the items to see if any of the records match the ideal parent
  let foundParent = false;
  result.Items.forEach((item) => {
    if (
      (!config.allowedParentTypes ||
        config.allowedParentTypes.includes(item.componentType)) &&
      (!config.allowedParentStatuses ||
        config.allowedParentStatuses.includes(item.currentStatus))
    )
      foundParent = true;
  });
  console.log("foundParent:", foundParent);
  return foundParent;
};
