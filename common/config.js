// This function allows us to get environment variables on the frontend without
// having to check if process exists before getting process.env.VAR
// process.env is replaced with an object containing the environment during build-time
function getEnv(env) {
  let environment = process.env;
  return environment[env];
}

export const config = {
  url: getEnv('URL') || 'explorer.phylogenyexplorerproject.com',
  admin_api_url: getEnv('ADMIN_API_URL')   || 'admin-api.phylogenyexplorerproject.com',
  public_api_url: getEnv('PUBLIC_API_URL') || 'public-api.phylogenyexplorerproject.com',
  sender_email: getEnv('AWS_SENDER_EMAIL') || 'contact@phylogenyexplorerproject.com',
  sender_name: getEnv('AWS_SENDER_NAME')   || 'Phylogeny Explorer Project'
};

export const aws = {
  bucket: getEnv('AWS_BUCKET'),
  region: getEnv('AWS_REGION'),
  identityPoolId: getEnv('AWS_IDENTITY_POOL_ID'),
  accessKeyId: getEnv('AWS_ACCESS_KEY_ID'),
  secretAccessKey: getEnv('AWS_SECRET_ACCESS_KEY')
};

export const database = {
  hosts: getEnv('DB_HOSTS'),
  ssl: getEnv('DB_SSL'),
  replica_set: getEnv('DB_REPLICA_SET'),
  auth_source: getEnv('DB_AUTH_SOURCE'),

  admin: {
    user: getEnv('ADMIN_DB_USER'),
    password: getEnv('ADMIN_DB_PASS'),
    name: getEnv('ADMIN_DB_NAME')
  },

  public: {
    user: getEnv('PUBLIC_DB_USER'),
    password: getEnv('PUBLIC_DB_PASS'),
    name: getEnv('PUBLIC_DB_NAME')
  }
};

export const analytics = {
  google: {
    trackingId: getEnv('GOOGLE_TRACKING_ID'),
  },
};

export const auth = {
  jwt: {
    secret: getEnv('JWT_SECRET') || 'a secret phrase!!'
  },

  // https://developers.facebook.com/
  facebook: {
    id:     getEnv('FACEBOOK_APP_ID')     || '186244551745631',
    secret: getEnv('FACEBOOK_APP_SECRET') || 'a970ae3240ab4b9b8aae0f9f0661c6fc',
  },

  // https://cloud.google.com/console/project
  google: {
    id:     getEnv('GOOGLE_CLIENT_ID')      || '251410730550-ahcg0ou5mgfhl8hlui1urru7jn5s12km.apps.googleusercontent.com',
    secret: getEnv('.GOOGLE_CLIENT_SECRET') || 'Y8yR9yZAhm9jQ8FKAL8QIEcd',
  },

  // https://apps.twitter.com/
  twitter: {
    key:    getEnv('TWITTER_CONSUMER_KEY')    || 'Ie20AZvLJI2lQD5Dsgxgjauns',
    secret: getEnv('TWITTER_CONSUMER_SECRET') || 'KTZ6cxoKnEakQCeSpZlaUCJWGAlTEBJj0y2EMkUBujA7zWSvaQ',
  },

};
