import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event) => {
  // If this invokation is a prewarm, do nothing and return.
  if (event.source == "serverless-plugin-warmup") {
    console.log("Warmed up!");
    return null;
  }

  const params = {
    TableName: process.env.oneMacTableName,
    Key: {
      pk: event.pathParameters.id,
      sk: "PACKAGE",
    },
  };

  const result = await dynamoDb.get(params);
  if (!result.Item) {
    throw new Error("Item not found.");
  }
  console.log("Sending back result:", JSON.stringify(result, null, 2));
  return { ...result.Item };
});
