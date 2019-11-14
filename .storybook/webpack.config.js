const path = require('path');
const webpack = require('webpack');

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('ts-loader'),
        options: {
          configFile: path.resolve(__dirname, './tsconfig.json'),
          reportFiles: ['src/renderer/**/*.{ts,tsx}'],
        },
      },
    ],
  });
  config.resolve.extensions.push('.ts', '.tsx');
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env.STORYBOOK': true,
    }),
  );
  return config;
};
