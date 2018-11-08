const path = require('path');

const COMMON = path.resolve(__dirname, 'common');
const VERBOSE = process.argv.includes('--verbose');
const IS_RELEASE = process.argv.includes('--release');
const IS_STAGING = process.argv.includes('--staging');

const IS_LOCAL = !IS_RELEASE;
const BUILD_DIR = path.resolve(__dirname, IS_LOCAL ? 'build' : 'release');
const ENVIRONMENT = IS_RELEASE ? 'production' : (IS_STAGING ? 'staging' : 'local');

const env = {
  IS_RELEASE,
  IS_LOCAL,
  VERBOSE,
  COMMON,
  BUILD_DIR,
  ENVIRONMENT
};

let configs = [
  require('user-api/webpack.config')(Object.assign({}, env, { BUILD_DIR: BUILD_DIR + '/user-api' })),
  require('tree-api/webpack.config')(Object.assign({}, env, { BUILD_DIR: BUILD_DIR + '/tree-api' })),
  require('daemon/webpack.config')(Object.assign({}, env, { BUILD_DIR: BUILD_DIR + '/daemon' })),
  ...require('client/webpack.config')(Object.assign({}, env, { BUILD_DIR: BUILD_DIR + '/client' })),
];

configs = configs.map(config => Object.assign(config, {
  mode: IS_RELEASE ? 'production' : 'development',
  cache: !IS_RELEASE,
  stats: {
    colors: true,
    hash: VERBOSE,
    version: VERBOSE,
    timings: true,
    chunks: VERBOSE,
    chunkModules: VERBOSE,
    cached: VERBOSE,
    cachedAssets: VERBOSE,
  },
}));


module.exports = configs;