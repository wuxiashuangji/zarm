/**
 * Created by fed on 2017/8/24.
 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const config = require('./config.base.js');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  resolve: config.resolve,
  entry: {
    index: ['./examples/index.js'],
    common: ['react', 'react-dom', 'react-router-dom'],
  },
  output: config.output,
  externals: {
    'babel-polyfill': 'undefined',
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  module: {
    rules: [
      ...config.module.rules,
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      process: {
        env: {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        },
        version: '"v10.0.0"',
      },
    }),
    new HtmlWebpackPlugin({
      template: './examples/index.html',
      filename: 'index.html',
      chunks: ['common', 'manifest', 'index'],
    }),
    new MiniCssExtractPlugin({
      filename: '[name]-[hash].css',
      chunkFilename: '[name]-[hash].css',
    }),
  ],
  devServer: {
    publicPath: config.output.publicPath,
    host: '0.0.0.0',
    port: 3000,
    useLocalIp: true,
    open: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {
      // '/api': {
      //   target: { host: proxyInfo[process.env.NODE_ENV].host, protocol: 'http' },
      //   pathRewrite: { '^/api': '' },
      //   secure: true,
      //   changeOrigin: true,
      //   https: true,
      //   headers: {
      //     Host: proxyInfo[process.env.NODE_ENV].host,
      //   },
      // },
      // '/srmApi': {
      //   target: { host: proxyInfo[process.env.NODE_ENV].srmHost, protocol: 'http' },
      //   pathRewrite: { '^/srmApi': '' },
      //   secure: true,
      //   changeOrigin: true,
      //   headers: {
      //     Host: proxyInfo[process.env.NODE_ENV].srmHost,
      //   },
      // },
    },
  },
};
