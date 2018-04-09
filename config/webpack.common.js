const path = require('path');

module.exports = {
  entry: {
    kvass: path.resolve(__dirname, '../src/index.jsx')
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    alias: {
      '@shareactor/shareactor-sdk/src/main' : path.resolve(__dirname, '../node_modules/@shareactor/shareactor-sdk/dist/main.bundle.js'),
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
       test: /\.scss/,
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
