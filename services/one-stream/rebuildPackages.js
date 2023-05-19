import AWS from "aws-sdk";

import { dynamoConfig } from "cmscommonlib";

const dynamoDb = new AWS.DynamoDB.DocumentClient(dynamoConfig);

const gsi1pksToRebuild = [
  "SEATool#Medicaid_SPA",
  "SEATool#CHIP_SPA",
  "SEATool#1915b_waivers",
  "SEATool#1915c_waivers",
];

export const main = async () => {
  // only run this if indicated in the deploy
  if (!process.env.deployTrigger || process.env.deployTrigger === "none")
    return;

  const toRebuild = [];

  await Promise.all(
    gsi1pksToRebuild.map(async (gsi1pk) => {
      // need the parameters inside the scope of the Promise
      const queryGSI1Params = {
        TableName: process.env.oneMacTableName,
        IndexName: "GSI1",
        KeyConditionExpression: "GSI1pk = :topic",
        ExpressionAttributeValues: {
          ":topic": gsi1pk,
        },
        ProjectionExpression: "pk, sk",
      };

      do {
        console.log(`queryGSI1Params: %s`, queryGSI1Params);
        const results = await dynamoDb.query(queryGSI1Params).promise();
        console.log("results: ", results);
        results.Items.forEach((item) => {
          const timestamp = Number(item.sk.replace("SEATool#", ""));
          if (!toRebuild[item.pk] || timestamp > toRebuild[item.pk])
            toRebuild[item.pk] = timestamp;
        });
        queryGSI1Params.ExclusiveStartKey = results.LastEvaluatedKey;
      } while (queryGSI1Params.ExclusiveStartKey);
    })
  );

  console.log("toRebuild: ", toRebuild);
  await Promise.all(
    toRebuild.map(async (item) => {
      await dynamoDb
        .update({
          TableName: process.env.oneMacTableName,
          Key: {
            pk: item.pk,
            sk: item.sk,
          },
          UpdateExpression: "SET deployTrigger = :dt",
          ExpressionAttributeValues: {
            ":dt": process.env.deployTrigger,
          },
        })
        .promise();
    })
  );
};
