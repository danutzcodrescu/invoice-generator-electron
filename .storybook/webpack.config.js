const path = require('path');
const webpack = require('webpack');

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      {
        loader: require.resolve('babel-loader'),
        options: {
          cacheDirectory: true,
          babelrc: false,
          presets: [
            [
              '@babel/preset-env',
              { targets: { browsers: 'last 1 Chrome version' } },
            ],
            '@babel/preset-typescript',
            '@babel/preset-react',
          ],
          plugins: [
            '@babel/plugin-proposal-optional-chaining',
            ['@babel/plugin-proposal-class-properties', { loose: true }],
            '@babel/plugin-proposal-nullish-coalescing-operator',
          ],
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
