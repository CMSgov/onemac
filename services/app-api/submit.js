import * as uuid from "uuid";
import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";
import sendEmail from "./libs/email-lib";
import getEmailTemplates from "./email-templates/getEmailTemplates";
import { DateTime } from "luxon";
import packageExists from "./changeRequest/changeRequest-util";

/**
 * Submission states for the change requests.
 */
const SUBMISSION_STATES = {
  CREATED: "created", // Change request is in process
  SUBMITTED: "submitted", // Email sent to CMS
};

/**
 * Submit a new record for storage.
 */
export const main = handler(async (event) => {
  let response;

  // If this invocation is a prewarm, do nothing and return.
  if (event.source == "serverless-plugin-warmup") {
    console.log("Warmed up!");
    return null;
  }
  const data = JSON.parse(event.body);

  if (await fieldsValid(data)) {
    // Add required data to the record before storing.
    //    console.log(event.requestContext.identity);
    data.id = uuid.v1();
    data.createdAt = Date.now();
    data.state = SUBMISSION_STATES.CREATED;

    //Normalize the user data.
    data.user = {
      id: event.requestContext.identity.cognitoIdentityId,
      authProvider: event.requestContext.identity.cognitoAuthenticationProvider,
      email: data.user.signInUserSession.idToken.payload.email,
      firstName: data.user.signInUserSession.idToken.payload.given_name,
      lastName: data.user.signInUserSession.idToken.payload.family_name,
    };
    data.userId = event.requestContext.identity.cognitoIdentityId;

    //Store the data in the database.
   try {
      await dynamoDb.put({
        TableName: process.env.tableName,
        Item: data,
      });

    // create the (package) ID data
    const packageParams = {
      TableName: process.env.spaIdTableName,
      Item: {
        "id": data.transmittalNumber,
        [data.id]: data.userId,
      }
    };
    await dynamoDb.put(packageParams);

   } catch (dbError) {
      console.log("This error is: " + dbError);
      throw dbError;
    }
    console.log(`Current epoch time:  ${Math.floor(new Date().getTime())}`);

    // map the email templates from the data.type
    const emailTemplate = getEmailTemplates(data.type);

    if (emailTemplate) {
      // Now send the CMS email
      await sendEmail(emailTemplate.getCMSEmail(data));

      //We successfully sent the submission email.  Update the record to reflect that.
      data.state = SUBMISSION_STATES.SUBMITTED;
      data.submittedAt = Date.now();

      // record the current end timestamp (can be start/stopped/changed)
      // 90 days is current CMS review period and it is based on CMS time!!
      // UTC is 4-5 hours ahead, convert first to get the correct start day
      // AND use plus days function b/c DST days are 23 or 25 hours!!
      data.ninetyDayClockEnd = DateTime.fromMillis(data.submittedAt).setZone('America/New_York').plus({ days: 90 }).toMillis();
      await dynamoDb.put({
        TableName: process.env.tableName,
        Item: data,
      });

      //An error sending the user email is not a failure.
      try {
        // send the submission "reciept" to the State User
        await sendEmail(emailTemplate.getStateEmail(data));
      } catch (error) {
        console.log(
          "Warning: There was an error sending the user acknowledgement email.",
          error
        );
      }
    } else console.log("No email template for this type!");

    console.log("Successfully submitted amendment:", data);
    response = {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } else {
    response = {
      statusCode: 500,
      body: JSON.stringify("Field Validation Failed"),
    };
  }

  return response;
});

/**
 * Check if the received data is valid.
 * @param {Object} data the received data
 * @returns true if the data is valid
 */
async function fieldsValid(data) {
  let isValid = true;
  if (!data.user) {
    console.log("ERROR: Missing user info data.");
    isValid = false;
  }

  if (!data.uploads) {
    console.log("ERROR: Missing attachments.");
    isValid = false;
  }

  if (!data.type) {
    console.log("ERROR: Missing record type.");
    isValid = false;
  } else {
    console.log("Fields Valid checking" + data.transmittalNumber);
    let isDup = await packageExists(data.transmittalNumber);
    if (isDup===true) {
      console.log("ERROR: Duplicate ID." + data.transmittalNumber);
      isValid = false;
    }

  }

  return isValid;
}
