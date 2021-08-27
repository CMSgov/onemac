import dynamoDb from "../libs/dynamodb-lib";

/**
 * Check to see if the included id exists in the data
 * @param {String} id ID to check for
 * @returns {Boolean} true if found in data, false if not in data
 */
export default async function packageExists(id) {
  //assume the territory is the first two chars

  let params = {
    TableName: process.env.oneMacTableName,
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: {
      ":pk": id,
    },
  };

  let result;
  try {
    console.log("params for checking: ", params);
    result = await dynamoDb.query(params);

    if (result.Count <= 0) {
      params = {
        TableName: process.env.spaIdTableName,
        KeyConditionExpression: "id = :pk",
        ExpressionAttributeValues: {
          ":pk": id,
        },
      };
      console.log("the params for checking", params);
      result = await dynamoDb.query(params);
    }

    if (result.Count <= 0) {
      params = {
        TableName: process.env.tableName,
        ExclusiveStartKey: null,
        ScanIndexForward: false,
        FilterExpression: "transmittalNumber = :packageid",
        ExpressionAttributeValues: {
          ":packageid": id,
        },
      };
      do {
        console.log("params for checking: ", params);
        const results = await dynamoDb.query(params);
        console.log("params are: ", params);
        console.log("results are: ", results);
        params.ExclusiveStartKey = results.LastEvaluatedKey;
      } while (params.ExclusiveStartKey && result.Count <= 0);
    }
  } catch (error) {
    console.log(`packageExists ${params.TableName} got an error: `, error);
  }

  return result.Count > 0;
}
