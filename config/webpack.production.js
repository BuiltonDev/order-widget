const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(['../dist'], { allowExternal: true }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new UglifyJSPlugin({
      sourceMap: true,
      uglifyOptions: {
        ecma: 5,
        mangle: false,
        keep_classnames: true,
        keep_fnames: true
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /(en-gb|nb)/)
  ],
  module: {
    rules: [
      {
        test: /\.scss/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  }
});
