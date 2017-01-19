
module.exports = {
  context: __dirname + "/client",
  entry: {
  	javascript: "./index.js",
  	html: "./index.html"
  },

  output: {
    filename: "index.js",
    path: __dirname + "/dist",
  },

  node: {
    fs: "empty"
  },

  devServer: {
  	contentBase: __dirname + "/dist",
  	proxy: {
	    "*" : "http://localhost:3000" // <- backend
	}
  },

  module: {
  	loaders: [
	  {
	    test: /\.js$/,
	    exclude: /node_modules/,
	    loader: "babel-loader"
	  },
	  {
	    test: /\.html$/,
		loader: "file?name=[name].[ext]",
	  },
	  { 
	  	test: /\.json$/, loader: "json-loader" 
	  }
	],
  },
}