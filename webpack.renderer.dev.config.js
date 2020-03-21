const merge = require('webpack-merge');
const spawn = require('child_process').spawn;
const path = require('path');
const baseConfig = require('./webpack.renderer.config');

module.exports = merge.smart(baseConfig, {
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  entry: {
    app: [
      'react-hot-loader/patch',
      path.resolve(__dirname, './src/renderer/index.tsx'),
    ],
  },
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
      console.log('Starting main process');
      spawn('npm', ['run', 'start-main-dev'], {
        shell: true,
        env: process.env,
        stdio: 'inherit',
      })
        .on('close', code => process.exit(code))
        .on('error', spawnError => console.error(spawnError));
      spawn('npm', ['run', 'start-server-dev'], {
        shell: true,
        env: process.env,
        stdio: 'inherit',
      })
        .on('close', code => process.exit(code))
        .on('error', spawnError => console.error(spawnError));
    },
  },
});
