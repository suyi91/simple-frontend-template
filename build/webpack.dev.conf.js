'use strict';

process.env.NODE_ENV = 'development';
const DEV_PORT = process.env.PORT || 8081; // Defaults to 8080 process.env.PORT

const path = require('path');
const webpack = require('webpack');
const Merge = require('webpack-merge');
let config = require('./webpack.base.conf');
const glob = require('glob');
const utils = require('./util');

const entryPaths = glob.sync(path.resolve('./src/entries/', '*/index.js'));
const entrySettings = utils.getEntries(entryPaths);

const generateRewriteRule = v => {
  if (v) {
    return {
      from: new RegExp('^\/' + v.name),
      to: `/${v.name}.html`
    }
  } else {
    return { from: /^\/$/, to: '/index.html' };
  }
}

config = Merge(config, {
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    historyApiFallback: {
      disableDotRule: true,
      rewrites: [null, ...entrySettings].map(v => generateRewriteRule(v)),
    },
    hot: true,
    inline: true,
    stats: { chunks:false },
    host: 'localhost', // Defaults to `localhost`   process.env.HOST
    port: DEV_PORT,
  },
});

module.exports = config;
