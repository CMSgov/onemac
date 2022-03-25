import dynamoDb from "../libs/dynamodb-lib";
import { USER_ROLE, USER_STATUS } from "cmscommonlib";

export const buildSK = (role, territory) => {
  switch (role) {
    case USER_ROLE.STATE_SUBMITTER:
      return `${USER_ROLE.STATE_SYSTEM_ADMIN}#${territory}`;
    case USER_ROLE.CMS_REVIEWER:
    case USER_ROLE.STATE_SYSTEM_ADMIN:
      return USER_ROLE.CMS_ROLE_APPROVER;
    case USER_ROLE.DEFAULT_CMS_USER:
    default:
      return "Boss";
  }
};

export const changeUserStatus = async ({
  email,
  fullName,
  doneByEmail,
  doneByName,
  date,
  role,
  territory,
  status,
}) => {
  // date should be in seconds. if milliseconds were sent, date will be greater than now...
  const chkTS = Math.floor(Date.now() / 1000);
  if (date > chkTS) {
    date = Math.floor(date / 1000);
  }

  // add a new v0 and v latest
  try {
    const updateParams = {
      TableName: process.env.oneMacTableName,
      ReturnValues: "UPDATED_NEW",
      Key: {
        pk: email.toLowerCase(),
        sk: `v0#${role}#${territory}`,
      },
      UpdateExpression:
        "SET Latest = if_not_exists(Latest, :defaultval) + :incrval, " +
        "#email = :email, #status = :status, #fullName = :fullName, " +
        "#doneByEmail = :doneByEmail, #doneByName = :doneByName, " +
        "#role = :role, #territory = :territory, #date = :date, " +
        "#GSI1pk = :GSI1pk, #GSI1sk = :GSI1sk",
      ExpressionAttributeNames: {
        "#email": "email",
        "#status": "status",
        "#fullName": "fullName",
        "#doneByEmail": "doneByEmail",
        "#doneByName": "doneByName",
        "#role": "role",
        "#territory": "territory",
        "#date": "date",
        "#GSI1pk": "GSI1pk",
        "#GSI1sk": "GSI1sk",
      },
      ExpressionAttributeValues: {
        ":email": email.toLowerCase(),
        ":status": status,
        ":fullName": fullName,
        ":doneByEmail": doneByEmail.toLowerCase(),
        ":doneByName": doneByName,
        ":role": role,
        ":territory": territory,
        ":date": date,
        ":GSI1pk": "USER",
        ":GSI1sk": buildSK(role, territory),
        ":defaultval": 0,
        ":incrval": 1,
      },
    };

    const response = await dynamoDb.update(updateParams);

    const latestVersion = response["Attributes"]["Latest"];

    const putParams = {
      TableName: process.env.oneMacTableName,
      Item: {
        pk: email.toLowerCase(),
        sk: `v${latestVersion}#${role}#${territory}`,
        status,
        doneByEmail: doneByEmail.toLowerCase(),
        doneByName,
        role,
        territory,
        date,
      },
    };
    await dynamoDb.put(putParams);
  } catch (e) {
    console.log("newUser put error: ", e);
    throw e;
  }

  // update contactInfo GSI
  const contactParams = {
    TableName: process.env.oneMacTableName,
    Key: {
      pk: email.toLowerCase(),
      sk: "ContactInfo",
    },
  };
  if (role !== USER_ROLE.STATE_SUBMITTER && status === USER_STATUS.ACTIVE) {
    contactParams.UpdateExpression = "SET GSI1pk = :newPk, GSI1sk = :newSk";
    contactParams.ExpressionAttributeValues = {
      ":newPk": `${role}#${territory}`,
      ":newSk": email.toLowerCase(),
    };
  } else {
    contactParams.UpdateExpression = "REMOVE GSI1pk, GSI1sk";
  }
  await dynamoDb.update(contactParams);
};
