// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import env from "../config/env";
import { mimeTypes } from "./constant";
import { exec } from "child_process";
import util from "util";
interface FileProps {
  base64: string;
  extension: string;
}
interface UploadToBuceketProps {
  file: FileProps;
  fileName: string;
}
// const s3 = new S3Client({
//   endpoint: `${env.DIGITAL_ENDPOINT}`,
//   region: "blr1",
//   credentials: {
//     accessKeyId: `${env.DIGITAL_ACCESS_ID}`,
//     secretAccessKey: `${env.DIGITAL_SECRET_KEY}`,
//   },
// });
const execPromise = util.promisify(exec);
const uploadToBucket = async ({ file, fileName }: UploadToBuceketProps) => {
  try {
    const mimeType = mimeTypes[file?.extension?.toLowerCase()];
    const buffer = Buffer.from(file?.base64, "base64");
    // const command = new PutObjectCommand({
    //   Bucket: "healthweb",
    //   Key: fileName,
    //   Body: buffer,
    //   ContentType: mimeType,
    //   ACL: "public-read",
    // });
    // await s3.send(command);
    return `${env.DIGITAL_BUCKET_URL}/${fileName}`;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const removeFromBucket = async ({ fileName }: any) => {
  try {
    const command = `AWS_ACCESS_KEY_ID=${env.DIGITAL_ACCESS_ID} \
    AWS_SECRET_ACCESS_KEY=${env.DIGITAL_SECRET_KEY} \
    aws --endpoint-url=${env.DIGITAL_ENDPOINT} s3 rm s3://healthweb/${fileName}`;
    console.log(command);

    const { stdout, stderr } = await execPromise(command);
    if (stderr) {
      throw new Error(stderr);
    }
    console.log("AWS CLI Output:", stdout);
    return true;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const getExactPath = async (cdn: string) => {
  const split = cdn.split(`${env.DIGITAL_BUCKET_URL}/`);
  return split.pop();
};

export default uploadToBucket;
