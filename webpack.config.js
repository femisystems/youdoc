const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './client/app.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: "app.min.js"
  }
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }

      }
    ]
  },
  devtool: 'source-map'
};