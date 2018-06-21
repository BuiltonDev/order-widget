const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = require('./keys');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: '../dist',
    hot: true
  },
  plugins: [
    new CleanWebpackPlugin(['../dist']),
    new HtmlWebpackPlugin({
      title: 'Kvass Order Widget',
      template: path.resolve(__dirname, './template.html')
    }),
    new webpack.DefinePlugin({
      DOM_ELEMENT_ID: JSON.stringify(config.domElementId),
      APIKEY: JSON.stringify(config.apiKey),
      ENDPOINT: JSON.stringify(config.endpoint),
      LANGUAGE: JSON.stringify(config.lng),
      FIREBASE_APIKEY: JSON.stringify(config.firebaseConfig.apiKey),
      FIREBASE_DOMAIN: JSON.stringify(config.firebaseConfig.domain),
      STRIPE_API_KEY: JSON.stringify(config.stripeApiKey)
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
});
