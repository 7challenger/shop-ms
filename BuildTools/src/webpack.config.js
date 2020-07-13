const path = require('path');

module.exports = {
  mode: 'development',
  target: 'node',

  resolve: {
    extensions: ['.ts', '.js'],

    alias: {
      stream: 'stream-browserify',
    },
  },

  devtool: 'eval-source-map',

  module: {
    rules: [
      {
        test: /\.(ts|js)(x?)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'ts-loader'
        }],
      },
    ],
  },
};
