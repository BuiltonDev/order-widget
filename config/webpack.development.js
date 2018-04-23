const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// Local development config
const config = require('../test/config');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: '../dist',
    hot: true
  },
  plugins: [
    new CleanWebpackPlugin(['../dist']),
    new webpack.DefinePlugin({
      APIKEY: JSON.stringify(config.apiKey),
      ENDPOINT: JSON.stringify(config.endpoint),
      FIREBASE_APIKEY: JSON.stringify(config.firebaseConfig.apiKey),
      FIREBASE_DOMAIN: JSON.stringify(config.firebaseConfig.domain)
    }),
    new HtmlWebpackPlugin({
      title: 'Kvass Ordering Widget',
      template: path.resolve(__dirname, '../test/index.html')
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
});
