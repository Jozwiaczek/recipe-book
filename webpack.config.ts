import path from 'path';
import {Configuration, DefinePlugin} from 'webpack';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const config: Configuration = {
  entry: [
    'react-hot-loader/patch',
    './src/index.tsx'
  ],

  output: {
    filename: 'main.[hash].js',
    path: path.resolve('./dist')
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    alias: {
      'react-dom': '@hot-loader/react-dom'
    },
    modules: [
      path.resolve('./node_modules'),
      path.resolve('.'),
    ],
  },

  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          }
        }
      }
    ]
  },

  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new DefinePlugin({
      'process.env': JSON.stringify({
        NODE_ENV: process.env.NODE_ENV,
      })
    })
  ],

  devtool: 'source-map',

  devServer: {
    stats: 'errors-warnings',
    historyApiFallback: true
  }
};

export default config;
