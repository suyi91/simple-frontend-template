'use strict';

process.env.NODE_ENV = 'production';

const path = require('path');
const webpack = require('webpack');
const Merge = require('webpack-merge');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
let config = require('./webpack.base.conf');

config.plugins.unshift(new CleanWebpackPlugin(['dist'], {
  root: path.join(__dirname, '..'),
}));

config = Merge(config, {
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: true,
      parallel: true
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
  ],
});

module.exports = config;
