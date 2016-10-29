var express = require("express")
var Spotify = require("./lib/spotify")

var app = express();
app.get('/search', function(req, res) {
	var queryText = req.query.q;
	if(queryText) {
		Spotify.search(queryText, function(results) {
			console.log("inside callback for /search");
			res.setHeader("Content-Type", "application/json");
			res.send(results);
		});	
	}
});
app.get('/loggedIn', function(req, res) {
	console.log("received a request to loggedIn");
	var error = req.query.error;
	if(error) {
		console.log(`/loggedIn came back with error: ${error}`);
	}
	var code = req.query.code;
	var state = req.query.state;
	Spotify.getToken(code, state);
});

app.use(express.static('public'));

app.listen('3000', function() {
	console.log('Running on port 3000');
});