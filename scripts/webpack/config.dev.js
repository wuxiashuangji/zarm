/**
 * Created by fed on 2017/8/24.
 */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./config.base.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = Object.assign({}, config, {
  mode: 'development',
  entry: {
    index: ['./examples/index.js'],
    common: ['react', 'react-dom', 'react-router-dom'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].[chunkhash].chunk.js',
    publicPath: '/',
  },
  devtool: 'cheap-module-source-map',
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
  ],
  devServer: {
    host: '0.0.0.0',
    port: 8080,
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
});
