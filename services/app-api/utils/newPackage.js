import dynamoDb from "../libs/dynamodb-lib";

export default async function newPackage(newData) {
  let data = {
    pk: newData.packageId,
    sk: "PACKAGE",
    GSI1pk: "OneMAC",
    GSI1sk: newData.packageId,
    packageId: newData.packageId,
    packageType: newData.packageType,
    currentStatus: newData.packageStatus,
    originalSubmissionDate: newData.submissionDate,
    currentClockEnd: newData.clockEndTimestamp,
    changeHistory: [newData],
  };

  var params = {
    TableName: process.env.oneMacTableName,
    Item: data,
  };

  console.log("params is: ", params);
  try {
    await dynamoDb.put(params);
  } catch (error) {
    throw error;
  }

  return "Success - newPackage";
}
