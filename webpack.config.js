module.exports = env => {
    let path = require('path');
    let adminAPI = require('admin-api/tools/webpack.config')(env);

    let configs = [adminAPI];

    configs.map(config => Object.assign({}, config, {
        resolve: {
            alias: {
                common: path.resolve(__dirname, 'common'),
            }
        }
    }));

    return configs;
};