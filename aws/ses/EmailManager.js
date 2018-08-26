import AWS from 'aws-sdk';
import { aws, config  } from '../../config';
import { Promise } from 'bluebird';

AWS.aws.update({
  region: aws.region,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: aws.identityPoolId,
  }),
});

class EmailManager {
  constructor() {
    this._ses = null;
  }

  getSES() {
    if (this._ses) return this._ses;

    this._ses = new AWS.SES({
      apiVersion: '2010-12-01',
      accessKeyId: aws.accessKeyId,
      secretAccessKey: aws.secretAccessKey,
      region: aws.region
    });

    return this._ses;
  }

  //NOTE: toAddresses must be a string array
  sendEmail(toAddresses, subject, body) {
    var params = {
        Destination: {
          ToAddresses: toAddresses
        },
        Message: { 
          Body: { 
            Html: {
             Charset: "UTF-8",
             Data: body
            }
        },
          Subject: {
          Charset: 'UTF-8',
          Data: subject
          }
        },
        Source: config.sender_email
      };       
    return this.getSES().sendEmail(params).promise();
  }
}

export default EmailManager;
