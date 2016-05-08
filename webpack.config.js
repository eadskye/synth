const path = require('path');

module.exports = {
  entry: "./js/main.js",
  output: {
    path: path.join(__dirname, "js"),
    filename: "bundle.js"
  },
  module: {
    loaders: [{
        test: /\.js$/,
        include: /js/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {presets: ['es2015', 'react']}
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
    }]
  }
}
