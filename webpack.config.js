const path = require('path');

module.exports = env => {
    let configs = [
      require('user-api/webpack.config')(env),
      require('tree-api/webpack.config')(env),
      require('daemon/webpack.config')(env),
      ...require('client/webpack.config')(env),
    ];

    configs = configs.map(config => Object.assign(config, {
        resolve: {
            alias: {
                common: path.resolve(__dirname, 'common'),
            }
        }
    }));

    return configs;
};