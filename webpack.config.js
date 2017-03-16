const webpack = require('webpack');
const path = require('path');

const APP_DIR = path.resolve(__dirname, '/client/app');
const BUILD_DIR = path.resolve(__dirname, '/client/build');

const config = {
  entry: APP_DIR + '/index.jsx',
  output: {
    path: BUILD_DIR
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules | bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  devtool: 'source-map'
};

module.exports = config;
