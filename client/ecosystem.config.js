const client_port   = 3000;

const DATE_FORMAT = 'YYYY-MM-DD HH:mm Z';

const AWS_BUCKET = process.env.AWS_BUCKET || ""
const AWS_REGION = process.env.AWS_REGION || ""
const GOOGLE_TRACKING_ID = process.env.GOOGLE_TRACKING_ID || ""
const DB_HOSTS = process.env.DB_HOSTS || "mongo:27017"

const AWS_PUBLIC = {
    "AWS_BUCKET" : AWS_BUCKET,
    "AWS_REGION" : AWS_REGION,
};

module.exports = {
    apps : [ {
        "name" : "admin-front-end",
        "script" : "server.js",
        "watch" : false,
        "DB_HOSTS": DB_HOSTS,
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