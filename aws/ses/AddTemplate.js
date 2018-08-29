/**
 *
 * This file is meant to be run from the command line - it adds new email templates to AWS
 *
 */


// Load the AWS SDK for Node.js
import AWS from 'aws-sdk';

AWS.config.update({
  region: "us-east-1"
});

let templateNames = [];
process.argv.forEach(function (val, index) {
  if (index === 0 || index === 1) return; // skip command and script name
  templateNames.push(val);
});

if (templateNames.length === 0) {
  console.error('No templates given');
  process.exit();
}

for (let i=0; i<templateNames.length; i++) {
  let template = require(`${__dirname}/templates/${templateNames[i]}.js`).default;
  new AWS.SES({apiVersion: '2010-12-01'}).createTemplate(template).promise()
    .then(data => console.log(data))
    .catch(err => console.error(err, err.stack));
}