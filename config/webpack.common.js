const path = require('path');

module.exports = {
  entry: {
    kvass: path.resolve(__dirname, '../src/index.jsx')
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css'],
    alias: {
      '@shareactor/shareactor-sdk' : path.resolve(__dirname, '../node_modules/@shareactor/shareactor-sdk/src/main.js'),
      'src': path.resolve(__dirname, '../src')
    }
  },
  module: {
   rules: [
     {
       test: /\.(js|jsx)$/,
       exclude: /node_modules/,
       use: ['babel-loader']
     },
     {
       test: /\.(css|scss)/,
       use: ['style-loader', 'css-loader', 'sass-loader']
     }
   ]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    libraryTarget: 'var',
    library: 'KvassOrdering'
  }
};
