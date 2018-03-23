/*!
 * Phylogeny Explorer
 *
 * @summary
 * @author John Ropas
 * @since 26/09/2016
 *
 * Copyright(c) 2016 Phylogeny Explorer
 */

// var webpack = require('webpack');
// var path = require('path');
const fs = require('fs');

const nodeModules = {};

fs.readdirSync('./node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .forEach(mod => (nodeModules[mod] = `commonjs ${mod}`));

module.exports = {
  entry: './src/app.js',
  target: 'node',
  output: {
    path: './build',
    filename: 'daemon.js',
  },
  externals: nodeModules,
  module: {
    loaders: [
      //     { test: /\.css$/, loader: "style!css" }
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
