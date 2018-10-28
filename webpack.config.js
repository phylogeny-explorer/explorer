const path = require('path');

module.exports = env => {
    let configs = [
        require('admin-api/tools/webpack.config')(env),
        require('public-api/tools/webpack.config')(env),
        require('daemon/tools/webpack.config')(env),
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