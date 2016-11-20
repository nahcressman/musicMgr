var express = require("express");
var sessions = require("client-sessions");
var Spotify = require("./lib/spotify");

var app = express();

app.use(sessions({
	cookieName: 'musicMgr', // cookie name dictates the key name added to the request object 
	secret: '', // should be a large unguessable string 
	duration: 24 * 60 * 60 * 1000, // how long the session will stay valid in ms 
}));

app.use(function(req,res,next) {
	if(req.musicMgr.email) {
		console.log("session: has repeat user " + req.musicMgr.email);
	}
	next();
});

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
	Spotify.getToken(code, state, function (result, auth_token, refresh_token, expirationTime) {
		//get the email address for the user
		if(result) {
			Spotify.getUserDetails(auth_token, function(details) {
				if(details && details.email) {
					console.log("got user email. it's " + details.email);
					req.musicMgr.email = details.email;
				}
			});
		}		
	});
	res.redirect('/');
});

app.use(express.static('public'));

app.listen('3000', function() {
	console.log('Running on port 3000');
});