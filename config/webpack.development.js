const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

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
      title: 'Kvass Ordering Widget',
      template: path.resolve(__dirname, '../example/index.html')
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
});
