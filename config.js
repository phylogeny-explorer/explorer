function getEnv(env) {
  if (!process || !process.env) return null;
  return process.env[env];
}

export const config = {
  url: getEnv('URL'),
  admin_api_url: getEnv('ADMIN_API_URL'),
  public_api_url: getEnv('PUBLIC_API_URL')
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
