import FileManager from 'AwsS3FileManager';
import { aws } from '../config';

let fileManager = new FileManager(
  aws.bucket,
  aws.region,
  aws.identityPoolId,
  aws.accessKeyId,
  aws.secretAccessKey
);

export default fileManager;