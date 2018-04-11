/*!
 * Phylogeny Explorer
 *
 * @summary
 * @author John Ropas
 * @since 26/09/2016
 *
 * Copyright(c) 2016 Phylogeny Explorer
 */

const fs = require('fs');
const GeneratePackageJsonPlugin = require('generate-package-json-webpack-plugin');

const PACKAGE_DIR = __dirname + "/../package.json";
const PACKAGE = require(PACKAGE_DIR);
const RELEASE = process.argv.includes('--release');

const buildPackage = {
  "name": PACKAGE.name,
  "version": PACKAGE.version,
  "private": PACKAGE.private,
  "bundledDependencies": Object.keys(PACKAGE.dependencies)
};

const nodeModules = {};
fs.readdirSync('./node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .forEach(mod => (nodeModules[mod] = `commonjs ${mod}`));

module.exports = {
  entry: './src/app.js',
  target: 'node',
  output: {
    path: RELEASE ? './release' : './build',
    filename: 'server.js',
  },
  externals: nodeModules,
  plugins: RELEASE ? [
    new GeneratePackageJsonPlugin(buildPackage, PACKAGE_DIR)
  ] : [],
  module: {
    loaders: [
      {
        test: /.json$/,
        loaders: ['json'],
      },
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: 'babel', // 'babel-loader' is also a valid name to reference
        query: {
          presets: ['es2015'],
        },
      },
    ],
  },
};
