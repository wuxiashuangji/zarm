const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const config = require('./config.base.js');

module.exports = Object.assign({}, config, {
  mode: 'production',
  cache: false,
  devtool: 'source-map',
  externals: {
    lodash: 'window._',
    jquery: 'jQuery',
    echarts: 'echarts',
    antd: 'antd',
    moment: 'moment',
    'babel-polyfill': 'undefined',
    react: 'React',
    'react-dom': 'ReactDOM',
    shineout: 'Shineout',
  },
  module: {
    rules: [
      ...config.module.rules,
    ],
  },
  optimization: {
    runtimeChunk: {
      name: () => 'manifest',
    },
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/](web|node)_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        parallel: true,
        cache: true,
        uglifyOptions: {
          compress: {
            // pure_funcs: ['console.log', 'console.info'],
          },
        },
      }),
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      process: {
        env: {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './examples/index.js',
      filename: './examples/index.html',
      alwaysWriteToDisk: true,
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]-[hash].css',
      chunkFilename: '[name]-[hash].css',
    }),
  ].concat(process.env.ANALYSIS ? new BundleAnalyzerPlugin() : []),
});
