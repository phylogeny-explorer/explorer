import AWS from 'aws-sdk';
import { aws as config } from '../../config';

AWS.config.update({
  region: config.region,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: config.identityPoolId,
  }),
});

class FileManager {
  _s3 = null;

  _keys = {
    clades: 'clades/',
    temp: 'temp/'
  };

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
    return `https://${this.getBucketName()}.s3.amazonaws.com`;
  }

  uploadTempImage(key, blob, cb) {
    const finalKey = this._keys.temp + key;
    const params = { Key: finalKey, Body: blob };
    this.getS3().putObject(params, (err, data) => cb(err, data));
  }

  destroyTempImage(key, cb) {
    const finalKey = this._keys.temp + key;
    const params = { Key: finalKey };
    this.getS3().deleteObject(params, (err, data) => cb(err, data));
  }

  destroyCladeImage(id, key, cb) {
    const finalKey = `${this._keys.clades}${id}/${key}`;
    const params = { Key: finalKey };
    this.getS3().deleteObject(params, (err, data) => cb(err, data));
  }

  moveTempImageToCladeFolder(key, cladeId, cb) {
    const sourceKey = `${this.getBucketName()}/${this._keys.temp}${key}`;
    const destinationKey = `${this._keys.clades}${cladeId}/${key}`;
    const params = { Key: destinationKey, CopySource: sourceKey };
    this.getS3().copyObject(params, (err, data) => {
      if (err) {
        cb(err);
      } else {
        this.destroyTempImage(key, (err1, data1) => {
          cb(err1);
        });
      }
    });
  }

  getTempUrl(key) {
    return `${this.getBucketUrl()}/${this._keys.temp}/${key}`;
  }

  getCladeUrl(cladeId, assetName) {
    return `${this.getBucketUrl()}/${this._keys.clades}/${cladeId}/${assetName}`;
  }

}

export default FileManager;
