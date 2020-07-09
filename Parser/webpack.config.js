const path = require('path');
const commonConfig = require('@7challenger/BuildTools');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  ...commonConfig,
  entry: './src/index.ts',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './build'),
  },

  externals: nodeExternals(),
};
