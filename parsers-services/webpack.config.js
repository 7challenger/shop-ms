const path = require('path');
const nodeExternals = require('webpack-node-externals');

const possibleEntries = {
  Api: './src/Api/index.ts',
  SiteChecker: './src/SiteChecker/start.ts',
  ParsersGateway: './src/ParsersGateway/start.ts',
}


module.exports = {
  mode: 'development',
  target: 'node',

  resolve: {
    extensions: ['.ts', '.js'],

    alias: {
      Utils: path.resolve(__dirname, 'src/Utils'),
      stream: 'stream-browserify',
    },
  },

  devtool: 'eval-source-map',

  entry: possibleEntries,

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './build'),
  },

  externals: [nodeExternals()],

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
