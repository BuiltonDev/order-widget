const webpackProd = require('./config/webpack.production.js');
const webpackDev = require('./config/webpack.development.js');

module.exports = (process.env.NODE_ENV === 'production') ? webpackProd : webpackDev;
