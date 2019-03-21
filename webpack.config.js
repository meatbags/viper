var path = require('path');
var webpack = require('webpack');
var appName = 'lilith';
var pathJS = './js/app.js';
var pathSCSS = './scss/main.js';
var pathOutput = 'theme/assets';

// JS
var MinifyPlugin = require("babel-minify-webpack-plugin");

// SASS testing
var MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = [{
  entry: {'application': pathJS},
  output: {
    library: appName,
    libraryTarget: 'var',
    path: path.resolve(__dirname, pathOutput),
    filename: '[name].js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader"
      }
    }]
  },
  resolve: {extensions: ['*', '.js']},
  plugins: [new MinifyPlugin({}, {comments: false})],
  stats: {colors: true, warnings: false}
}, {
  entry: {'style.webpack': pathSCSS},
  output: {
    path: path.resolve(__dirname, pathOutput),
    filename: '[name].js'
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {}
        }, {
          loader: 'css-loader',
          options: {importLoaders: 2, sourceMap: true}
        }, {
          loader: 'sass-loader',
          options: {sourceMap: true}
        }
      ]
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "./style.css",
      allChunks: true
    })
  ],
  stats: {colors: true, warnings: false}
}];
