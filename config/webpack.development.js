const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
require('core-js');

module.exports = {
  entry: ['./src/index.jsx'],
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    alias: {
      '@shareactor/shareactor-sdk/src/main' : path.resolve(__dirname, '../node_modules/@shareactor/shareactor-sdk/dist/main.bundle.js')
    }
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    libraryTarget: 'var',
    library: 'KvassOrdering',
    filename: 'main.bundle.js',
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }, {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        use: [{
          loader: 'css-loader',
        }, {
          loader: 'sass-loader',
        }],
        // use style-loader in development
        fallback: 'style-loader',
      }),
    }],
  },
  plugins: [
    new ExtractTextPlugin({ filename: './index.css' }),
  ],
};
