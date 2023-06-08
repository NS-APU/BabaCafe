import * as fs from 'fs';
// import { join } from 'path';

export async function putBase64Image(
  fileNamePrefix: string,
  data: string,
): Promise<string> {
  const res = data.match(/^data:\w+\/(\w+);base64,(.+)$/);
  const fileExtension = res[1];
  const fileData = res[2];
  const decodedData = Buffer.from(fileData, 'base64');
  const fileName = `${fileNamePrefix}.${fileExtension}`;

  await putObject(fileName, decodedData);

  return fileName;
}

export async function putObject(
  fileName: string,
  data: string | Buffer,
): Promise<string> {
  // if (process.env.NODE_ENV === 'development') {
  // const dir = join(process.cwd(), 'public');
  fs.writeFileSync(`${fileName.replaceAll('/', '-')}`, data);
  // }
  // TODO: 本番環境用にs3バケットに保存する以下処理を実装
  // else {
  //   const s3 = new S3({
  //     accessKeyId: process.env.ACCESS_KEY,
  //     secretAccessKey: process.env.SECRET_KEY,
  //     region: process.env.REGION,
  //   });
  //   await s3
  //     .putObject({
  //       Body: data,
  //       Bucket: process.env.S3_BUCKET,
  //       Key: `upload/${fileName}`,
  //       ACL: 'public-read',
  //     })
  //     .promise();
  // }

  return fileName;
}

export function getUrl(fileNameOrUrl: string) {
  if (!fileNameOrUrl) return null;
  if (fileNameOrUrl.startsWith('http')) return fileNameOrUrl;

  return `http://localhost:3000/${fileNameOrUrl.replaceAll('/', '-')}`;
}
