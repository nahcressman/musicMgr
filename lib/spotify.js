var https = require('https');
var path = require('path');
var querystring = require('querystring');
var fs = require('fs');

var SPOTIFY_API_BASE = 'api.spotify.com';
var SPOTIFY_SEARCH_ENDPOINT = '/v1/search';
var ARTIST_TYPE = "artist";
var TRACK_TYPE = "track";
var ALBUM_TYPE = "album";

var SPOTIFY_ACCOUNTS_BASE = 'accounts.spotify.com';
var SPOTIFY_TOKEN_PATH = '/api/token';
var AUTH_REDIRECT_URI = 'http://localhost:3000/loggedIn';
var CLIENT_ID = "2068662022c74a1697dcc0e4eeacf439";
var CLIENT_SECRET = "";

var Spotify = function () {};

Spotify.prototype.getToken = function (authCode, state, callback) {
	console.log("Spotify.getToken: requesting access token");

	var post_data = querystring.stringify({
		grant_type: "authorization_code",
		code: authCode,
		redirect_uri: AUTH_REDIRECT_URI,
		client_id: CLIENT_ID,
		client_secret: CLIENT_SECRET
	});

	var requestOptions = {
		hostname: SPOTIFY_ACCOUNTS_BASE,
		path: SPOTIFY_TOKEN_PATH,
		method: "POST",
		headers: {
		    'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': Buffer.byteLength(post_data)
		}
	};

  	var post_req = https.request(requestOptions, function(res) {
  		var authResponseBody = ""; 
  		var authStatusCode = res.statusCode;
  		console.log("response from spotify auth had code: " + authStatusCode);

	  	res.setEncoding('utf8');
	  	res.on('data', function (chunk) {
	   		authResponseBody += chunk;
	  	});
	  	res.on('end', function() {
	  		var results = JSON.parse(authResponseBody);
	  		if(results.access_token) {
	  			console.log("access_token is " + results.access_token);
	  		}
	  		if(results.refresh_token) {
	  			console.log("refresh_token is " + results.refresh_token);
	  		}
	  		if(results.expires_in) {
	  			console.log("expires in " + results.expires_in + "seconds");
	  		}
	  		callback(true, access_token, refresh_token);
	  	});
  	}).on('error', function(error){ 
  		console.log("request to auth had error: " + error);
  	});

  	post_req.write(post_data);
  	post_req.end();
},
Spotify.prototype.search = function (query, callback) {
	var artistQueryParameters = querystring.stringify({q: query, type: ARTIST_TYPE});
	var trackQueryParameters = querystring.stringify({q: query, type: TRACK_TYPE});
	var albumQueryParameters = querystring.stringify({q: query, type: ALBUM_TYPE});

	var artistQueryPath = SPOTIFY_SEARCH_ENDPOINT + '?' + artistQueryParameters;
	var trackQueryPath = SPOTIFY_SEARCH_ENDPOINT + '?' + trackQueryParameters;
	var albumQueryPath = SPOTIFY_SEARCH_ENDPOINT + '?' + albumQueryParameters;

	var searchPaths = [];
	searchPaths.push(artistQueryPath);
	searchPaths.push(trackQueryPath);
	searchPaths.push(albumQueryPath);
	
	searchResponseObject = {
		artists: null,
		tracks: null,
		albums: null
	};

	searchPaths.forEach(function(searchPath) {
		console.log(`Spotify: making request to ${SPOTIFY_API_BASE}${searchPath}`);
		var req = https.get({
			host: SPOTIFY_API_BASE,
			path: searchPath
		}, function(response) {
			var body = '';
			response.on('data', function(d) {
				body += d;
			});
			response.on('end', function() {
				console.log("¥nFinished receiving data. Parsing");
				var resultSet = JSON.parse(body);
				var returnList = [];
				if(resultSet.artists)
				{
					console.log("found artists results");
					returnList = resultSet.artists.items.map( function(artistEntry) {
						return {
							name: artistEntry.name,
							popularity: artistEntry.popularity
						};
					});			
					searchResponseObject.artists = returnList;
				}
				else if(resultSet.tracks)
				{
					console.log("found track results");
					returnList = resultSet.tracks.items.map( function(trackEntry) {
						return {
							name: trackEntry.name,
							popularity: trackEntry.popularity
						};
					});			
					searchResponseObject.tracks = returnList;
				}
				else if(resultSet.albums)
				{
					console.log("found album results");
					returnList = resultSet.albums.items.map( function(albumEntry) {
						return {
							name: albumEntry.name,
							popularity: albumEntry.popularity
						};
					});			
					searchResponseObject.albums = returnList;
				}

				if(searchResponseObject.artists && searchResponseObject.tracks && searchResponseObject.albums) {
					console.log("sending data back to callback");
					callback(searchResponseObject);
				}
			});
		});
		req.end();
	});
};

module.exports = new Spotify();
