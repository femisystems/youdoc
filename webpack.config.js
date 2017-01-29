const path = require('path');

module.exports = {
  entry: './client/src/app.js',
  output: {
    path: path.resolve(__dirname, '/client/build'),
    filename: 'app.min.js'
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
