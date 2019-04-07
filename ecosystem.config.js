const WORKSPACE = './build/';
const DATE_FORMAT = 'YYYY-MM-DD HH:mm Z';

const client_port   = 3000;
const user_api_port = 5000;
const tree_api_port = 5500;

const AWS_PUBLIC = {
  "AWS_BUCKET": "phylex-assets",
  "AWS_REGION": "us-east-1"
};

const AWS_IDENTITY_POOL_ID = process.env.AWS_IDENTITY_POOL_ID || ""
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || ""
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || ""

const AWS_CONFIG = Object.assign({}, AWS_PUBLIC, {
  "AWS_IDENTITY_POOL_ID": AWS_IDENTITY_POOL_ID,
  "AWS_ACCESS_KEY_ID": AWS_ACCESS_KEY_ID,
  "AWS_SECRET_ACCESS_KEY": AWS_SECRET_ACCESS_KEY
});

module.exports = {
  apps: [
    {
      "name": "client",
      "script": "server.js",
      "cwd": WORKSPACE + "client",
      "watch": true,
      "log_date_format" : DATE_FORMAT,
      "env": Object.assign({}, AWS_PUBLIC, {
        "NODE_ENV": "development",
        "PORT": client_port,
      })
    },

    {
      "name": "tree-api",
      "script": "server.js",
      "cwd": WORKSPACE + "tree-api",
      "watch": true,
      "log_date_format" : DATE_FORMAT,
      "env": Object.assign({}, {
        "NODE_ENV": "development",
        "PORT": tree_api_port,
      })
    },

    {
      "name": "user-api",
      "script": "server.js",
      "cwd": WORKSPACE + "user-api",
      "watch": true,
      "ignore_watch": ['build/temp'],
      "log_date_format" : DATE_FORMAT,
      "env": Object.assign({}, AWS_CONFIG, {
        "NODE_ENV": "development",
        "PORT": user_api_port,
      })
    },

    {
      "name": "daemon",
      "script": "server.js",
      "cwd": WORKSPACE + "daemon",
      "watch": true,
      "log_date_format" : DATE_FORMAT,
      "env": Object.assign({}, AWS_CONFIG, {
        "NODE_ENV": "development",
      })
    }
  ]
};
