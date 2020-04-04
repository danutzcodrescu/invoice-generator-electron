const merge = require('webpack-merge');
const SentryWebpackPlugin = require('@sentry/webpack-plugin');

const baseConfig = require('./webpack.renderer.config');

module.exports = merge.smart(baseConfig, {
  mode: 'production',
  plugins: [
    new SentryWebpackPlugin({
      include: './dist',
      release: `${process.env.npm_package_productName}_${process.env.npm_package_version}`,
    }),
  ],
});
