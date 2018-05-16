'use strict';

const path = require('path');
const Merge = require('webpack-merge');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const glob = require('glob');
const utils = require('./util');

const dev = process.env.NODE_ENV === 'development';

const entryPaths = glob.sync(path.resolve('./src/entries/', '*/index.js'));
const entrySettings = utils.getEntries(entryPaths);

const entry = {};
entrySettings.forEach(v => {
  entry[v.name] = v.path;
})

const getHtmlPlugin = setting => new HtmlWebpackPlugin({
  template: setting.template,
  filename: setting.name + '.html',
  inject: true,
  chunks: 'all',
  excludeChunks: entrySettings.filter(i => i.name !== setting.name).map(i => i.name),
  chunksSortMode: 'dependency',
});

let config = {
  entry,
  output: {
    // https://webpack.js.org/concepts/output/#multiple-entry-points
    path: path.resolve(__dirname, '../dist'),
    filename: dev ? 'js/[name].js' : 'js/[name].[chunkhash:8].js',
  },
  resolve: {
    extensions: ['.js'],
  },
  devtool: dev ? '#inline-source-map' : '#source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [path.join(__dirname, '../src')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.join(__dirname, '../src')],
        options: {

          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          cacheDirectory: true,
        },
      },
      {
        test: /\.css$/,
        include: [path.join(__dirname, '../src')],
        use: [
          dev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.less$/,
        include: [path.join(__dirname, '../src')],
        use: [
          dev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.scss$/,
        include: [path.join(__dirname, '../src')],
        use: [
          dev ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new MiniCssExtractPlugin({
      filename: dev ? 'css/[name].css' : 'css/[name].[hash:8].css',
      chunkFilename: dev ? 'css/[id].css' : 'css/[id].[hash].css',
    }),
    new FriendlyErrorsWebpackPlugin(),
  ],
  optimization: {
    splitChunks: {
      chunks: "async",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: "all"
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
    runtimeChunk: {
      name: 'manifest'
    },
  }
};

entrySettings.forEach(v => {
  config.plugins.push(getHtmlPlugin(v));
})

module.exports = config;
