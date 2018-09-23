const DIR = './admin_api/';

module.exports = env => {
    const fs = require('fs');
    const GeneratePackageJsonPlugin = require('generate-package-json-webpack-plugin');

    const PACKAGE_DIR = DIR + "../package.json";
    const PACKAGE = require(PACKAGE_DIR);
    // const COMMON_PACKAGE = require(__dirname + "/../src/common/package.json");
    const RELEASE = false; //env.release;

    const buildPackage = {
        "name": PACKAGE.name,
        "version": PACKAGE.version,
        "private": PACKAGE.private,
        // "dependencies": COMMON_PACKAGE.dependencies,
        "bundledDependencies": [
            ...Object.keys(PACKAGE.dependencies).filter(x => ['.bin', 'common'].indexOf(x) === -1),
            // ...Object.keys(COMMON_PACKAGE.dependencies)
        ]
    };

    const nodeModules = {};
    fs.readdirSync('./node_modules')
    .filter(x => ['.bin'].indexOf(x) === -1)
    .forEach(mod => (nodeModules[mod] = `commonjs ${mod}`));

    return {
        entry: __dirname + '/../src/app.js',
        target: 'node',
        output: {
            path: __dirname + (RELEASE ? '/../release' : '/../build'),
            filename: 'server.js',
        },
        mode: RELEASE ? 'production' : 'development',
        externals: nodeModules,
        plugins: RELEASE ? [
            new GeneratePackageJsonPlugin(buildPackage, PACKAGE_DIR)
        ] : [],
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: [/node_modules/],
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            'babel-preset-env'
                        ].map(require.resolve),
                        plugins: [
                            ["babel-plugin-transform-strict-mode", { "strict": true }]
                        ].map(plugin => require.resolve(plugin[0]))
                    },
                },
            ],
        },
    }
};
