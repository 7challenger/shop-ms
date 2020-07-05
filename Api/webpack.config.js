const path = require('path');
const commonConfig = require('@7challenger/BuildTools');

module.exports = {
  ...commonConfig,
  entry: './src/index.ts',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './build'),
  },
};
