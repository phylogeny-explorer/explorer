const path = require('path');

module.exports = {
  "presets": [
    ["@babel/preset-env", { "shippedProposals": true }],
    "@babel/preset-react"
  ],
  "plugins": [
    ["transform-strict-mode", { "strict": true }],
    ['module-resolver', {
      'alias': {
        'common': path.resolve(__dirname, 'common')
      }
    }],
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-export-default-from',
  ]
};