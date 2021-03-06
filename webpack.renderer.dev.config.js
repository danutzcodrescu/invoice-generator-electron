const merge = require('webpack-merge');
const spawn = require('child_process').spawn;
const webpack = require('webpack');
const baseConfig = require('./webpack.renderer.config');

module.exports = merge.smart(baseConfig, {
  devServer: {
    port: 2003,
    compress: true,
    noInfo: true,
    stats: 'errors-only',
    inline: true,
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    historyApiFallback: {
      verbose: true,
      disableDotRule: false,
    },
    before() {
      if (process.env.START_HOT) {
        console.log('Starting main process');
        spawn('npm', ['run', 'start-main-dev'], {
          shell: true,
          env: process.env,
          stdio: 'inherit',
        })
          .on('close', (code) => process.exit(code))
          .on('error', (spawnError) => console.error(spawnError));
        spawn('npm', ['run', 'start-server-dev'], {
          shell: true,
          env: process.env,
          stdio: 'inherit',
        })
          .on('close', (code) => process.exit(code))
          .on('error', (spawnError) => console.error(spawnError));
      }
    },
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
