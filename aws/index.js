import FileManager from './s3/FileManager';
import { aws } from '../config';

let s3 = null;
if (aws.secretAccessKey) {
  s3 = new FileManager(
    aws.bucket,
    aws.region,
    aws.identityPoolId,
    aws.accessKeyId,
    aws.secretAccessKey
  );
}

export const S3 = s3;