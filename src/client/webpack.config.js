const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env) => {
  return {
    mode: env.NODE_ENV,
    ...(env.NODE_ENV == 'development'
      ? {
          devtool: 'eval-cheap-source-map',
          entry: {
            main: ['webpack-hot-middleware/client', './src/client/index.tsx'],
          },
          plugins: [
            new CopyWebpackPlugin({
              patterns: [{ from: './src/client/public' }],
            }),
            new webpack.HotModuleReplacementPlugin(),
          ],
        }
      : {
          entry: './src/client/index.tsx',
          devtool: 'eval-cheap-source-map',
          // devtool: 'inline-source-map',
          plugins: [
            new CopyWebpackPlugin({
              patterns: [{ from: './src/client/public' }],
            }),
          ],
        }),
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, '../../build/client'),
    },

    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
              },
            },
          ],
        },
        {
          test: /\.s?css$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
      ],
    },
  };
};
