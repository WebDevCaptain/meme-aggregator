import S3 from "aws-sdk/clients/s3.js";

const s3 = new S3({
  region: "us-east-1",
  endpoint: process.env.FILEBASE_URL,
  accessKeyId: process.env.FILEBASE_KEY,
  secretAccessKey: process.env.FILEBASE_SECRET,
  s3ForcePathStyle: true,
  apiVersion: "2006-03-01",
});

const Bucket = process.env.S3_BUCKET as string;

// const params = {
//   Bucket: "meme-aggregator",
//   MaxKeys: 20,
// };

// s3.listObjectsV2(params, (err, data) => {
//   if (err) {
//     console.log("Error", err);
//   } else {
//     console.log("Success", data);
//   }
// });

export interface IGetObjectByKeyResponse {
  file: S3.Body | undefined;
  contentType: string | undefined;
}

export function getObjectByKey(key: string): Promise<IGetObjectByKeyResponse> {
  const params = {
    Bucket,
    Key: key,
  };

  return new Promise((resolve, reject) => {
    s3.getObject(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve({
          file: data.Body,
          contentType: data.ContentType,
        });
      }
    });
  });
}
