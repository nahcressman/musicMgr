var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  context: __dirname,
  entry: {
    client_main: './client/app-client.js',
    css: './client/styles/sassStyles.scss'
  },
  output: {
    filename: "[name].js",
    path: __dirname + "/dist",
  },
  devtool: 'eval-source-maps',
  plugins: [
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true
    }),
  ],

  node: {
    fs: 'empty',
  },

  module: {
  	rules: [
  	  {
  	    test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
  	         loader: "babel-loader"
          }
        ]
  	  },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  }
}