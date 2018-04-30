import FileManager from './s3/FileManager';
import { aws } from '../config';

export const S3 = new FileManager(
  aws.bucket,
  aws.region,
  aws.identityPoolId,
  aws.accessKeyId,
  aws.secretAccessKey
);