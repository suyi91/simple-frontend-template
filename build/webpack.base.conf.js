'use strict';

const path = require('path');
const Merge = require('webpack-merge');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const dev = process.env.NODE_ENV === 'development';

let config = {
  entry: {
    // https://webpack.js.org/concepts/entry-points/#multi-page-application
    app: './src/index.js',
    vendor: ['jquery'],
  },
  output: {
    // https://webpack.js.org/concepts/output/#multiple-entry-points
    path: path.resolve(__dirname, '../dist'),
    filename: dev ? 'js/[name].js' : 'js/[name].[chunkhash].js',
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader', // creates style nodes from JS strings
          use: [{
            loader: 'css-loader', // translates CSS into CommonJS
            options: { importLoaders: 1 },
          }, {
            loader: 'postcss-loader',
          }],
        }),
      },
      {
        test: /\.less$/,
        include: [path.join(__dirname, '../src')],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader', // creates style nodes from JS strings
          use: [{
            loader: 'css-loader', // translates CSS into CommonJS
            options: { importLoaders: 1 },
          }, {
            loader: 'postcss-loader',
          }, {
            loader: 'less-loader' // compiles Less to CSS
          }],
        }),
      },
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      // filename: "vendor.js"
      // (Give the chunk a different name)

      minChunks: Infinity,
      // (with more entries, this ensures that no other module
      //  goes into the vendor chunk)
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    new ExtractTextPlugin({
      filename: dev ? 'css/f6.css' : 'css/f6.[contenthash].css',
    }), // https://webpack.js.org/plugins/extract-text-webpack-plugin/#usage
    new HtmlWebpackPlugin({  // Also generate a test.html
      filename: 'index.html',
      template: './src/index.html',
      inject: true,
    }),
    new FriendlyErrorsWebpackPlugin(),
  ]
};

module.exports = config;
