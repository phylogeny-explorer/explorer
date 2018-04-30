/*!
 * Phylogeny Explorer
 *
 * @summary
 * @author John Ropas
 * @since 17/11/2016
 *
 * Copyright(c) 2016 Phylogeny Explorer
 */

import AWS from 'aws-sdk';

class FileManager {

  constructor(bucket, region, identityPoolId, accessKeyId, secretAccessKey) {
    this._keys = { clades: 'clades/', users: 'users/', temp: 'temp/' };
    this._bucketName = bucket;
    this._bucketRegion = region;
    this._IdentityPoolId = identityPoolId;

    AWS.config.update({
      region: this._bucketRegion,
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: this._IdentityPoolId,
      }),
    });

    this.s3 = new AWS.S3({
      apiVersion: '2006-03-01',
      params: { Bucket: this._bucketName },
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
    });
  }

  uploadTempImage(key, blob, cb) {
    const finalKey = this._keys.temp + key;
    const params = { Key: finalKey, Body: blob };
    this.s3.putObject(params, (err, data) => cb(err, data));
  }

  destroyTempImage(key, cb) {
    const finalKey = this._keys.temp + key;
    const params = { Key: finalKey };
    this.s3.deleteObject(params, (err, data) => cb(err, data));
  }

  destroyCladeImage(id, key, cb) {
    const finalKey = `${this._keys.clades}${id}/${key}`;
    const params = { Key: finalKey };
    this.s3.deleteObject(params, (err, data) => cb(err, data));
  }

  moveTempImageToCladeFolder(key, cladeId, cb) {
    const sourceKey = `${this._bucketName}/${this._keys.temp}${key}`;
    const destinationKey = `${this._keys.clades}${cladeId}/${key}`;
    console.error(sourceKey, destinationKey);
    const params = { Key: destinationKey, CopySource: sourceKey };
    this.s3.copyObject(params, (err, data) => {
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
    return `https://${this._bucketName}.s3.amazonaws.com/temp/${key}`;
  }

}

export default FileManager;
