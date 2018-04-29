const fs = require('fs');
const RELEASE = process.argv.includes('--release');

const nodeModules = {};
fs.readdirSync('./node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .forEach(mod => (nodeModules[mod] = `commonjs ${mod}`));

module.exports = {
  entry: __dirname + '/index.js',
  target: 'node',
  output: {
    path: __dirname + '/lib',
    filename: 'index.js',
  },
  mode: RELEASE ? 'production' : 'development',
  externals: nodeModules,
  module: {
    rules: [
      {
        test: /.json$/,
        loaders: ['json'],
      },
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: 'babel-loader',
        options: {
          presets: ['env'],
          plugins: [
            "add-module-exports",
            ["transform-strict-mode", { "strict": true }]
          ]
        },
      },
    ],
  },
};
