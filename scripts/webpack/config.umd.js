const path = require('path');
const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const config = require('./config.base');
const {
  version, name, author, repository,
} = require('../../package.json');

const env = process.env.NODE_ENV;

const cssConfig = {
  filename: '[name].css',
  allChunks: true,
};

if (env === 'production') {
  cssConfig.filename = '[name].min.css';
  config.plugins.push(new MiniCssExtractPlugin(cssConfig));
  config.plugins.push(new OptimizeCssAssetsPlugin({
    assetNameRegExp: /\.css$/g,
    cssProcessor: require('cssnano'),
    cssProcessorOptions: {
      discardComments: {
        removeAll: true,
      },
    },
    canPrint: true,
  }));

  config.output.filename = '[name].min.js';
  config.optimization.minimizer.push(
    new UglifyJsPlugin({
      sourceMap: true,
      parallel: true,
      cache: true,
      uglifyOptions: {
        compress: {
          // pure_funcs: ['console.log', 'console.info'],
        },
      },
    })
  );
  config.plugins.push(new BundleAnalyzerPlugin());
  config.plugins.push(new webpack.BannerPlugin(`
  ${name} v${version}

  Github: ${repository.url}

  Copyright (c) 2013-present, ${author}, Inc.

  This source code is licensed under the MIT license found in the
  LICENSE file in the root directory of this source tree.
  `));
} else {
  config.plugins.push(new MiniCssExtractPlugin(cssConfig));
}

config.plugins.push(new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify(env || 'production'),
  __DEBUG__: false,
}));

module.exports = {
  ...config,
  mode: 'production',
  devtool: 'source-map',
  entry: {
    [name]: [
      './components/index.js',
      './styles/index.scss',
    ],
  },
  output: {
    library: name,
    libraryTarget: 'umd',
    path: path.resolve(__dirname, '../../dist'),
    filename: '[name].js',
  },
  externals: {
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
    },
    'prop-types': {
      root: 'PropTypes',
      commonjs2: 'prop-types',
      commonjs: 'prop-types',
      amd: 'prop-types',
    },
  },
};
