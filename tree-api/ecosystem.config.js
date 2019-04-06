const public_api_port = 5500;

const DATE_FORMAT = 'YYYY-MM-DD HH:mm Z';

const DB_HOSTS = process.env.DB_HOSTS || "localhost:27017"
const DB_REPLICA_SET = process.env.DB_REPLICA_SET || ""
const PUBLIC_DB_USER = process.env.PUBLIC_DB_USER || ""
const PUBLIC_DB_PASS = process.env.PUBLIC_DB_PASS || ""

module.exports = {
  apps: [
    {
      "name": "public-api",
      "script": "server.js",
      "log_date_format" : DATE_FORMAT,
      "env": Object.assign({}, {
        "NODE_ENV": "development",
        "PORT": public_api_port,
        "ADMIN_DB_NAME": "phylex-admin",
        "PUBLIC_DB_NAME": "phylex-public"
      }),
      'env_production': Object.assign({}, {
        "DB_HOSTS": DB_HOSTS,
        "PUBLIC_DB_USER": PUBLIC_DB_USER,
        "PUBLIC_DB_PASS": PUBLIC_DB_PASS,
        "PUBLIC_DB_NAME": "phylex-public",
        "DB_REPLICA_SET": DB_REPLICA_SET,
        "DB_SSL": true,
        "DB_AUTH_SOURCE": "admin",
        "NODE_ENV": "production",
        "PORT": public_api_port
      })
    }
  ]
};
