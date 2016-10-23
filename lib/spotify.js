var https = require('https');
var path = require('path');
var querystring = require('querystring');

var SPOTIFY_API_BASE = 'api.spotify.com';
var SPOTIFY_SEARCH_ENDPOINT = '/v1/search';
var ARTIST_TYPE = "artist";
var TRACK_TYPE = "track";
var ALBUM_TYPE = "album";

var Spotify = function () {};

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
