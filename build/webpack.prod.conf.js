'use strict';

process.env.NODE_ENV = 'production';

const webpack = require('webpack');
const Merge = require('webpack-merge');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
let config = require('./webpack.base.conf');

config = Merge(config, {
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    // UglifyJs do not support ES6+, you can also use babel-minify for better treeshaking: https://github.com/babel/minify
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      sourceMap: true,
      comments: false,
      parallel: true,
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
