import path from 'path';
import webpack from 'webpack';
import extend from 'extend';
import AssetsPlugin from 'assets-webpack-plugin';
const GeneratePackageJsonPlugin = require('generate-package-json-webpack-plugin');

module.exports = (env) => {
  const AUTOPREFIXER_BROWSERS = [
    'Android 2.3',
    'Android >= 4',
    'Chrome >= 35',
    'Firefox >= 31',
    'Explorer >= 9',
    'iOS >= 7',
    'Opera >= 12',
    'Safari >= 7.1',
  ];

  // Front-end globals - injected into front-end code during build time
  const GLOBALS = {
    local: {
      'AWS_BUCKET': '"phylex-assets"',
      'AWS_REGION': '"us-east-1"',
      'PUBLIC_API_HOSTNAME': process.env.PHYLEX_PUBLIC_API_HOSTNAME ? `"${process.env.PHYLEX_PUBLIC_API_HOSTNAME}"` : '"localhost:5500"',
      'ADMIN_API_HOSTNAME': process.env.PHYLEX_ADMIN_API_HOSTNAME ? `"${process.env.PHYLEX_ADMIN_API_HOSTNAME}"` : '"localhost:5000"',
      'WEBSITE_HOSTNAME': process.env.PHYLEX_WEBSITE_HOSTNAME ? `"${process.env.PHYLEX_WEBSITE_HOSTNAME}"` : '"localhost:3000"',
      'PORT': 3000,
      __DEV__: env.IS_LOCAL,
    },

    staging: {
      'AWS_BUCKET': '"phylex-assets"',
      'AWS_REGION': '"us-east-1"',
      'PUBLIC_API_HOSTNAME': '"staging-public-api.phylogenyexplorerproject.com"',
      'ADMIN_API_HOSTNAME': '"staging-admin-api.phylogenyexplorerproject.com"',
      'WEBSITE_HOSTNAME': '"staging-explorer.phylogenyexplorerproject.com"',
      'PORT': 3000,
      __DEV__: env.IS_LOCAL,
    },

    production: {
      'AWS_BUCKET': '"phylex-assets"',
      'AWS_REGION': '"us-east-1"',
      'PUBLIC_API_HOSTNAME': '"public-api.phylogenyexplorerproject.com"',
      'ADMIN_API_HOSTNAME': '"admin-api.phylogenyexplorerproject.com"',
      'WEBSITE_HOSTNAME': '"explorer.phylogenyexplorerproject.com"',
      'PORT': 3000,
      __DEV__: env.IS_LOCAL,
    }
  };


  const PACKAGE_DIR = __dirname + "/package.json";
  const PACKAGE = require(PACKAGE_DIR);
  const COMMON_PACKAGE = require("common/package.json");

  const buildPackage = {
    "name": PACKAGE.name,
    "version": PACKAGE.version,
    "private": PACKAGE.private,
    "dependencies": COMMON_PACKAGE.dependencies,
    "bundledDependencies": [
      ...Object.keys(PACKAGE.dependencies).filter(x => ['.bin', 'common'].indexOf(x) === -1),
      ...Object.keys(COMMON_PACKAGE.dependencies)
    ]
  };


  //
  // Common configuration chunk to be used for both
  // client-side (client.js) and server-side (server.js) bundles
  // -----------------------------------------------------------------------------
  const config = {
    context: path.resolve(__dirname, 'src'),

    output: {
      path: env.BUILD_DIR + '/public/assets',
      publicPath: '/assets/',
      sourcePrefix: '  ',
    },

    resolve: {
      extensions: ['.webpack.js', '.web.js', '.js', '.jsx', '.json'],
      alias: { common: env.COMMON }
    },

    resolveLoader: {
      moduleExtensions: ["-loader"]
    },

    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: {
            loader: 'babel-loader',
            options: {
              include: [
                path.resolve(__dirname, 'src'),
              ],
              exclude: /node_modules/
            }
          }
        },
        {
          test: /\.css/,
          use: [
            'isomorphic-style-loader',
            `css-loader?${JSON.stringify({
              sourceMap: env.IS_LOCAL,
              // CSS Modules https://github.com/css-modules/css-modules
              modules: true,
              localIdentName: env.IS_LOCAL ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:4]',
              // CSS Nano http://cssnano.co/options/
              minimize: !env.IS_LOCAL,
            })}`,
            {
              loader: 'postcss-loader',
              options: {
                plugins: (bundler) => [
                  // Transfer @import rule by inlining content, e.g. @import 'normalize.css'
                  // https://github.com/postcss/postcss-import
                  require('postcss-import')({addDependencyTo: bundler}),
                  // W3C variables, e.g. :root { --color: red; } div { background: var(--color); }
                  // https://github.com/postcss/postcss-custom-properties
                  require('postcss-custom-properties')(),
                  // W3C CSS Custom Media Queries, e.g. @custom-media --small-viewport (max-width: 30em);
                  // https://github.com/postcss/postcss-custom-media
                  require('postcss-custom-media')(),
                  // CSS4 Media Queries, e.g. @media screen and (width >= 500px) and (width <= 1200px) { }
                  // https://github.com/postcss/postcss-media-minmax
                  require('postcss-media-minmax')(),
                  // W3C CSS Custom Selectors, e.g. @custom-selector :--heading h1, h2, h3, h4, h5, h6;
                  // https://github.com/postcss/postcss-custom-selectors
                  require('postcss-custom-selectors')(),
                  // W3C calc() function, e.g. div { height: calc(100px - 2em); }
                  // https://github.com/postcss/postcss-calc
                  require('postcss-calc')(),
                  // Allows you to nest one style rule inside another
                  // https://github.com/jonathantneal/postcss-nesting
                  require('postcss-nesting')(),
                  // W3C color() function, e.g. div { background: color(red alpha(90%)); }
                  // https://github.com/postcss/postcss-color-function
                  require('postcss-color-function')(),
                  // Convert CSS shorthand filters to SVG equivalent, e.g. .blur { filter: blur(4px); }
                  // https://github.com/iamvdo/pleeease-filters
                  require('pleeease-filters')(),
                  // Generate pixel fallback for "rem" units, e.g. div { margin: 2.5rem 2px 3em 100%; }
                  // https://github.com/robwierzbowski/node-pixrem
                  require('pixrem')(),
                  // W3C CSS Level4 :matches() pseudo class, e.g. p:matches(:first-child, .special) { }
                  // https://github.com/postcss/postcss-selector-matches
                  require('postcss-selector-matches')(),
                  // Transforms :not() W3C CSS Level 4 pseudo class to :not() CSS Level 3 selectors
                  // https://github.com/postcss/postcss-selector-not
                  require('postcss-selector-not')(),
                  // Postcss flexbox bug fixer
                  // https://github.com/luisrudge/postcss-flexbugs-fixes
                  require('postcss-flexbugs-fixes')(),
                  // Add vendor prefixes to CSS rules using values from caniuse.com
                  // https://github.com/postcss/autoprefixer
                  require('autoprefixer')({browsers: AUTOPREFIXER_BROWSERS}),
                ]
              }
            }
          ],
        },
        {
          test: /\.txt$/,
          use: 'raw-loader',
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
          use: {
            loader: 'url-loader',
            options: {
              name: env.IS_LOCAL ? '[path][name].[ext]?[hash]' : '[hash].[ext]',
              limit: 10000,
            }
          },
        },
        {
          test: /\.(eot|ttf|wav|mp3)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: env.IS_LOCAL ? '[path][name].[ext]?[hash]' : '[hash].[ext]',
            }
          }
        },
      ],
    }
  };

  //
  // Configuration for the client-side bundle (client.js)
  // -----------------------------------------------------------------------------
  const clientConfig = extend(true, {}, config, {
    entry: './client.js',
    target: 'web',
    node: {child_process: 'empty', fs: 'empty'},

    output: {
      filename: env.IS_LOCAL ? '[name].js?[chunkhash]' : '[name].[chunkhash].js',
      chunkFilename: env.IS_LOCAL ? '[name].[id].js?[chunkhash]' : '[name].[id].[chunkhash].js',
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: `"${env.ENVIRONMENT}"`,
          ...GLOBALS[env.ENVIRONMENT],
          BROWSER: true
        }
      }),

      // Emit a file with assets paths
      // https://github.com/sporto/assets-webpack-plugin#options
      new AssetsPlugin({
        path: env.BUILD_DIR,
        filename: 'assets.js',
        processOutput: assets => `module.exports = ${JSON.stringify(assets)};`,
      }),

      // Assign the module and chunk ids by occurrence count
      // Consistent ordering of modules required if using any hashing ([hash] or [chunkhash])
      // https://webpack.github.io/docs/list-of-plugins.html#occurrenceorderplugin
      new webpack.optimize.OccurrenceOrderPlugin(true),

      ...env.IS_LOCAL ? [] : [

        // Search for equal or similar files and deduplicate them in the output
        // https://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
        new webpack.optimize.DedupePlugin(),

        // Minimize all JavaScript output of chunks
        // https://github.com/mishoo/UglifyJS2#compressor-options
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            screw_ie8: true, // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
            warnings: env.VERBOSE,
          },
        }),

        // A plugin for a more aggressive chunk merging strategy
        // https://webpack.github.io/docs/list-of-plugins.html#aggressivemergingplugin
        new webpack.optimize.AggressiveMergingPlugin(),
      ],
    ],

    // Choose a developer tool to enhance debugging
    // http://webpack.github.io/docs/configuration.html#devtool
    devtool: env.IS_LOCAL ? 'source-map' : false,
  });

  //
  // Configuration for the server-side bundle (server.js)
  // -----------------------------------------------------------------------------
  const serverConfig = extend(true, {}, config, {
    entry: './server.js',
    target: 'node',

    output: {
      path: env.BUILD_DIR,
      filename: 'server.js',
      chunkFilename: 'server.[name].js',
      libraryTarget: 'commonjs2',
    },

    externals: [
      /^\.\/assets$/,
      /^[@a-z][a-z\/\.\-0-9]*$/i,
    ],

    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: `"${env.ENVIRONMENT}"`,
          BROWSER: false
        }
      }),

      new webpack.BannerPlugin({
        banner: 'require("source-map-support").install();',
        raw: true,
        entryOnly: false
      }),

      new GeneratePackageJsonPlugin(buildPackage, PACKAGE_DIR),
    ],

    node: {
      console: false,
      global: false,
      process: false,
      child_process: 'empty',
      Buffer: false,
      __filename: false,
      __dirname: false,
    },

    devtool: 'source-map',
  });

  return [clientConfig, serverConfig];
};
