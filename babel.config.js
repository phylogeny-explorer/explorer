const path = require("path");

module.exports = {
  presets: [
    ["@babel/preset-env", { shippedProposals: true }],
    "@babel/preset-react"
  ],

  plugins: [
    [
      "@babel/plugin-transform-runtime",
      {
        corejs: false,
        helpers: false,
        regenerator: true,
        useESModules: false
      }
    ],
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-export-default-from",
    ["transform-strict-mode", { strict: true }],
    [
      "module-resolver",
      {
        alias: {
          common: path.resolve(__dirname, "common")
        }
      }
    ],
    "@babel/plugin-transform-modules-commonjs",
    "@babel/plugin-transform-async-to-generator"
  ]
};
