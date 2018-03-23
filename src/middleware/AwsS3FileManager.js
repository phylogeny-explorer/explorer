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

class AwsS3FileManager {

  constructor() {
    this._keys = { clades: 'clades/', users: 'users/', temp: 'temp/' };
    this._bucketName = 'phylex-public';
    this._bucketRegion = 'us-west-2';
    this._IdentityPoolId = 'us-west-2:b2f72e6f-7da5-4c9b-b7ff-074bfe8b7b2e';
    AWS.config.update({
      region: this._bucketRegion,
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: this._IdentityPoolId,
      }),
    });

    this.s3 = new AWS.S3({
      apiVersion: '2006-03-01',
      params: { Bucket: this._bucketName },
      accessKeyId: 'AKIAJSYMTOIUYJCOV4DQ',
      secretAccessKey: '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',
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
}

export default AwsS3FileManager;
