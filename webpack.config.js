require("dotenv").config({ silent: true });
const path = require("path");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require("webpack");
const isProductionBuild = process.env.BUILD_ENV === "production";

module.exports = {
  devtool: isProductionBuild ? "cheap-module-source-map" : "eval-source-map",
  entry: [
    "babel-polyfill", 
    "./src/index.jsx"
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new ExtractTextPlugin({
      filename: 'default.css'
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.BUILD_ENV),
      }
    }),
  ],
  resolve: {
    modules: ["node_modules"],
    extensions: [".js", ".jsx"]
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: false
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'eslint-loader',
      }, {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },{
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMaps: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMaps: true
              }
            }
          ]
        })
      }]
  }
};
