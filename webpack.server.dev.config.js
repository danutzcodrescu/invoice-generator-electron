const merge = require('webpack-merge');
const NodemonPlugin = require('nodemon-webpack-plugin');

const baseConfig = require('./webpack.server.config');

module.exports = merge.smart(baseConfig, {
  mode: 'development',
  plugins:[new NodemonPlugin({
    args: ['src/data']
  })]
});
