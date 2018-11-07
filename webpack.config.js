const path = require('path');

const env = {
  release: process.argv.includes('--release'),
  common: path.resolve(__dirname, 'common')
};

let configs = [
  require('user-api/webpack.config')(env),
  require('tree-api/webpack.config')(env),
  require('daemon/webpack.config')(env),
  ...require('client/webpack.config').default,
];

configs = configs.map(config => Object.assign(config, {
  resolve: {
    alias: {
      common: path.resolve(__dirname, 'common'),
    }
  }
}));


module.exports = configs;