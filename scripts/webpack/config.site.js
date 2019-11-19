const webpack = require('webpack');
const path = require('path');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  CleanWebpackPlugin,
} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const {
  BundleAnalyzerPlugin,
} = require('webpack-bundle-analyzer');

const config = require('./config.base.js');

module.exports = {
  mode: 'production',
  cache: false,
  devtool: 'source-map',
  externals: {
    'babel-polyfill': 'undefined',
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  resolve: config.resolve,
  entry: {
    index: ['./examples/index.js'],
    common: ['react', 'react-dom', 'react-router-dom'],
  },
  output: {
    path: path.resolve(__dirname, '../../assets'),
    chunkFilename: 'js/[name].[chunkhash:8].js',
    filename: 'js/[name].[chunkhash:8].js',
    publicPath: './',
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
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
          safe: true,
          discardComments: {
            removeAll: true,
          },
        },
        canPrint: true,
      }),
    ],
  },
  plugins: [
    ...config.plugins,
    new webpack.DefinePlugin({
      process: {
        env: {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './examples/index.html',
      filename: 'index.html',
      chunks: ['common', 'manifest', 'index'],
      alwaysWriteToDisk: true,
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]-[hash].css',
      chunkFilename: '[name]-[hash].css',
    }),
  ].concat(process.env.ANALYSIS ? new BundleAnalyzerPlugin() : []),
};
