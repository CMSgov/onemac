/**
 * Lambda function that will be perform the scan and tag the file accordingly.
 */

import AWS from "aws-sdk";
import path from "path";
import crypto from "crypto";
import fs from "fs";

import { downloadAVDefinitions, scanLocalFile } from "./clamav";
import * as utils from "./utils";
import * as constants from "./constants";

const s3 = new AWS.S3();

/**
 * Retrieve the file size of S3 object without downloading.
 * @param {string} key    Key of S3 object
 * @param {string} bucket Bucket of S3 Object
 * @return {int} Length of S3 object in bytes.
 */
export async function sizeOf(key, bucket) {
  console.log("key: " + key);
  console.log("bucket: " + bucket);

  const res = await s3.headObject({ Key: key, Bucket: bucket }).promise();
  return res.ContentLength;
}

/**
 * Check if S3 object is larger then the MAX_FILE_SIZE set.
 * @param {string} s3ObjectKey       Key of S3 Object
 * @param {string} s3ObjectBucket   Bucket of S3 object
 * @return {Promise<boolean>} True if S3 object is larger then MAX_FILE_SIZE
 */
export async function isS3FileTooBig(s3ObjectKey, s3ObjectBucket) {
  const fileSize = await sizeOf(s3ObjectKey, s3ObjectBucket);
  return fileSize > constants.MAX_FILE_SIZE;
}

function downloadFileFromS3(s3ObjectKey, s3ObjectBucket) {
  if (!fs.existsSync(constants.TMP_DOWNLOAD_PATH)) {
    fs.mkdirSync(constants.TMP_DOWNLOAD_PATH);
  }

  const tmpFilename = `${crypto.randomUUID()}.tmp`;
  const localPath = `${constants.TMP_DOWNLOAD_PATH}${tmpFilename}`;
  const writeStream = fs.createWriteStream(localPath);

  utils.generateSystemMessage(
    `Downloading file s3://${s3ObjectBucket}/${s3ObjectKey}`
  );

  const options = {
    Bucket: s3ObjectBucket,
    Key: s3ObjectKey,
  };

  return new Promise((resolve, reject) => {
    s3.getObject(options)
      .createReadStream()
      .on("end", function () {
        utils.generateSystemMessage(
          `Finished downloading new object ${s3ObjectKey}`
        );
        resolve(localPath);
      })
      .on("error", function (err) {
        console.log(err);
        reject();
      })
      .pipe(writeStream);
  });
}

export async function lambdaHandleEvent(event) {
  utils.generateSystemMessage("Start Antivirus Lambda function");
  console.log("Kristin1: the event from s3: ", event);

  const s3ObjectKey = utils.extractKeyFromS3Event(event);
  const s3ObjectBucket = utils.extractBucketFromS3Event(event);

  utils.generateSystemMessage(
    `S3 Bucket and Key\n ${s3ObjectBucket}\n${s3ObjectKey}`
  );

  let virusScanStatus;

  //You need to verify that you are not getting too large a file
  //currently lambdas max out at 500MB storage.
  if (await isS3FileTooBig(s3ObjectKey, s3ObjectBucket)) {
    virusScanStatus = constants.STATUS_SKIPPED_FILE;
    utils.generateSystemMessage(
      `S3 File is too big. virusScanStatus=${virusScanStatus}`
    );
  } else {
    //No need to act on file unless you are able to.
    utils.generateSystemMessage("Download AV Definitions");
    await downloadAVDefinitions();
    utils.generateSystemMessage("Download File from S3");
    const fileLoc = await downloadFileFromS3(s3ObjectKey, s3ObjectBucket);
    utils.generateSystemMessage("Set virusScanStatus");
    virusScanStatus = scanLocalFile(fileLoc);
    utils.generateSystemMessage(`virusScanStatus=${virusScanStatus}`);
  }

  const taggingParams = {
    Bucket: s3ObjectBucket,
    Key: s3ObjectKey,
    Tagging: utils.generateTagSet(virusScanStatus),
  };

  //tag object with CLEAN tag upon successful av scan
  try {
    await s3.putObjectTagging(taggingParams).promise();
    utils.generateSystemMessage("Tagging successful");
  } catch (err) {
    console.log(err);
  }
  return virusScanStatus;
}

export async function scanS3Object(s3ObjectKey, s3ObjectBucket) {
  await downloadAVDefinitions();

  await downloadFileFromS3(s3ObjectKey, s3ObjectBucket);

  const virusScanStatus = scanLocalFile(path.basename(s3ObjectKey));

  const taggingParams = {
    Bucket: s3ObjectBucket,
    Key: s3ObjectKey,
    Tagging: utils.generateTagSet(virusScanStatus),
  };

  try {
    await s3.putObjectTagging(taggingParams).promise();
    utils.generateSystemMessage("Tagging Successful");
    s3.putObjectTagging(taggingParams, function (err, data) {
      if (err) console.log(err, err.stack);
      else console.log(data);
    });
  } catch (err) {
    console.log(err);
  }
  return virusScanStatus;
}
