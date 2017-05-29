var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  context: __dirname + "/client",
  entry: './index.js',
  output: {
    filename: "[name].js",
    path: __dirname + "/dist",
  },

  node: {
    fs: "empty"
  },

  devServer: {
    	contentBase: __dirname + "/dist",
    	proxy: {
  	    "/api" : "http://localhost:3000", // <- backend
        "/loggedIn" : "http://localhost:3000"
  	}
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new ExtractTextPlugin({
      filename: 'public/style.css',
      allChunks: true
    })
  ],

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