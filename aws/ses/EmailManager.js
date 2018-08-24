import AWS from 'aws-sdk';
import { aws as config } from '../../config';
import { Promise } from 'bluebird';

AWS.config.update({
  region: config.region,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: config.identityPoolId,
  }),
});

const SENDER_EMAIL = 'proulxemmanuel@gmail.com';


   class EmailManager {
  constructor() {
    this._ses = null;
  }

  getSES() {
    if (this._ses) return this._ses;

    this._ses = new AWS.SES({
      apiVersion: '2010-12-01',
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
      region: config.region
    });

    return this._ses;
  }

  sendEmail(toAddress, subject, body) {
    var params = {
        Destination: {
          ToAddresses: [
            toAddress
          ]
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
        Source: SENDER_EMAIL
      };       
    return this.getSES().sendEmail(params).promise();
  }
}

export default EmailManager;
