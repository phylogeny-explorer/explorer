const client_port   = 3000;

const workspace = '.';
const DATE_FORMAT = 'YYYY-MM-DD HH:mm Z';

const AWS_BUCKET = process.env.AWS_BUCKET || ""
const AWS_REGION = process.env.AWS_REGION || ""
const GOOGLE_TRACKING_ID = process.env.GOOGLE_TRACKING_ID || ""

const AWS_PUBLIC = {
    "AWS_BUCKET" : AWS_BUCKET,
    "AWS_REGION" : AWS_REGION,
};

module.exports = {
    apps : [ {
        "name" : "admin-front-end",
        "script" : "server.js",
        "cwd" : workspace + "server",
        "watch" : false,
        "log_date_format" : DATE_FORMAT,
        "env" : Object.assign({}, AWS_PUBLIC, {
            "NODE_ENV" : "development",
            "PORT": client_port,
        }),
        "env_production" : Object.assign({}, AWS_PUBLIC, {
            "NODE_ENV" : "production",
            "GOOGLE_TRACKING_ID" : GOOGLE_TRACKING_ID
        })
    } ]
};