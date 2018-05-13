import AWS from 'aws-sdk';
import { aws as config } from '../../config';

AWS.config.update({
  region: config.region,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: config.identityPoolId,
  }),
});

const KEY_CLADES = 'clades';
const KEY_TEMP = 'temp';

class FileManager {
  _s3 = null;

  getS3() {
    if (this._s3) return this._s3;

    this._s3 = new AWS.S3({
      apiVersion: '2006-03-01',
      params: { Bucket: config.bucket },
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
    });

    return this._s3;
  }

  getBucketName() {
    return config.bucket;
  }

  getBucketUrl() {
    return `//${this.getBucketName()}.s3.amazonaws.com`;
  }

  getCladeKey(cladeId, assetId) {
    return `${KEY_CLADES}/${cladeId}/${assetId}`;
  }

  getTempKey(assetId) {
    return `${KEY_TEMP}/${assetId}`;
  }

  getTempUrl(assetId) {
    return `${this.getBucketUrl()}/${KEY_TEMP}/${assetId}`;
  }

  getCladeUrl(cladeId, assetId) {
    return `${this.getBucketUrl()}/${KEY_CLADES}/${cladeId}/${assetId}`;
  }

  uploadTempImage(assetId, blob, cb) {
    const params = { Key: this.getTempKey(assetId), Body: blob };
    return this.getS3().putObject(params, cb);
  }

  destroyTempImage(assetId, cb) {
    const params = { Key: this.getTempKey(assetId) };
    return this.getS3().deleteObject(params, cb);
  }

  destroyCladeImage(cladeId, assetId, cb) {
    const params = { Key: this.getCladeKey(cladeId, assetId) };
    return this.getS3().deleteObject(params, cb);
  }

  moveTempImageToCladeFolder(assetId, cladeId, cb) {
    let self = this;

    const params = {
      Key: this.getCladeKey(cladeId, assetId),
      CopySource: this.getTempKey(assetId)
    };

    return this.getS3().copyObject(params)
      .on('error', cb)
      .on('success', function() {
        self.destroyCladeImage(assetId, cb);
      });
  }
}

export default FileManager;
