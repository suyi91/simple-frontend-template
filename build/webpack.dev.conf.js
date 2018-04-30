'use strict';

process.env.NODE_ENV = 'development';
const DEV_PORT = process.env.PORT || 8081; // Defaults to 8080 process.env.PORT

const webpack = require('webpack');
const Merge = require('webpack-merge');
let config = require('./webpack.base.conf');

config = Merge(config, {
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    stats: { chunks:false },
    host: 'localhost', // Defaults to `localhost`   process.env.HOST
    port: DEV_PORT,
  },
});

module.exports = config;
