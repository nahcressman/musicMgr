import express from 'express';
import sessions from 'client-sessions';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import MusicMgrApp from '../client/components/MusicMgrApp';
import Spotify from './lib/spotify';
import { StaticRouter } from 'react-router';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import RootReducer from '../client/reducers';
import { 
	initializeMusicManager,
	getManagedPlaylistForUser,
	getManagedPlaylistById,
	createNewPlaylistForUser,
	registerNewClient,
	broadcastToClients,
	addSongToPlaylist,
	getAuthTokenForPlaylist } from './musicManager/musicManager';
import expressWs from 'express-ws';

import dotenv from 'dotenv';
dotenv.config();

var sendJSONResult = function(response, resultsToSend) {
	response.setHeader("Content-Type", "application/json");
	response.send(resultsToSend != null ? resultsToSend : {});
}

var app = express();
expressWs(app);

var project_base_path = require('path').resolve(__dirname, '..')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

console.log(process.env)

initializeMusicManager();

let logRequest = (req) => {
	console.log('received request: ');
	console.log(JSON.stringify({
		headers: req.headers,
		originalUrl: req.originalUrl
	}));
}

app.use(sessions({
	cookieName: 'musicMgr', // cookie name dictates the key name added to the request object 
	secret: process.env.MM_SESSION_SECRET, // should be a large unguessable string 
	duration: 24 * 60 * 60 * 1000, // how long the session will stay valid in ms 
}));

app.use(function(req,res,next) {
	if(req.musicMgr &&
		req.musicMgr.userDetails &&
		req.musicMgr.expirationTime) {
		console.log("User has a previous session stored. id: " + req.musicMgr.userDetails.id);
		var now = new Date();
		if(req.musicMgr.expirationTime < now.getTime()) {
			console.log("auth token expired, resetting session")
			req.musicMgr.reset();
		}
	}
	
	next();
});

app.get('/api/searchByType', function(req, res) {
	logRequest(req);
	var queryText = req.query.q;
	var searchType = req.query.searchType;
	if(req.musicMgr)
	{
		let auth_token = req.musicMgr.auth_token || getAuthTokenForPlaylist(req.musicMgr.hostPlaylistId);
		if (!auth_token) {
			res.status(400).send({"error": "Not authorized, log in or host a playlist"});
		} else if(queryText) {
			Spotify.searchByType(queryText, searchType, auth_token, function(results) {
				console.log("inside callback for /searchByType");
				sendJSONResult(res, results);
			});	
		} else {
			//res.setHeader("Content-Type", "application/json");
			res.status(400).send({"error":"no search query specified"});
			res.send({});
		}
	}
	else
	{
		res.status(400).send({"error":"need to be logged in"});
	}
});
app.get('/loggedIn', function(req, res) {
	logRequest(req);
	console.log("received a request to loggedIn");
	var error = req.query.error;
	if(error) {
		console.log(`/loggedIn came back with error: ${error}`);
	}
	var code = req.query.code;
	var state = req.query.state;

	Spotify.getToken(code, state, function (result, auth_token, refresh_token, expirationTime) {
		if(result) {
			req.musicMgr = {
				auth_token: auth_token,
				refresh_token: refresh_token,
				expirationTime: expirationTime
			}
			Spotify.getUserDetails(auth_token, function(details) {
				if(details) {
					req.musicMgr.userDetails = details;
					console.log('user logged in:');
					console.log(JSON.stringify(details));
				}
				res.redirect('/host')
			});
		}		
		else {
			res.redirect('/');
		}
	});
});
app.get('/api/getPlaylists', function(req, res) {
	logRequest(req);
	console.log("received a request to getPlaylists");
	if(req.musicMgr && req.musicMgr.auth_token)
	{
		Spotify.getUserPlaylists(req.musicMgr.userDetails.id, req.musicMgr.auth_token, function (response) {
			console.log('call to GetPlaylists completing');			
			res.status(response.status).send(response.results);
		});
	}
	else
	{
		console.log('getPlaylists: user was not logged in');
		res.status(401);
		res.send({"error":"User Not Logged In"});
	}
});
app.get('/api/logout', function(req, res) {
	logRequest(req);
	console.log("received a request to logout");
	if(req.musicMgr) {
		req.musicMgr.reset();
	}
	res.status(200).send("");
});
app.get('/api/getPlaylistGenres', function(req, res) {
	logRequest(req);
	console.log("received a request to getPlaylistGenres");
	if(!req.query.id) {
		console.log('getPlaylistGenres: no playlist id was provided');
		res.status(400);
		res.send({"error":"Must provide playlist id as a parameter."});
	}
	else if(req.musicMgr && req.musicMgr.auth_token) {
		Spotify.getPlaylistGenres(req.musicMgr.userDetails.id, req.query.id, req.musicMgr.auth_token, function (response) {
			console.log('call to getPlaylistGenres completing');
			res.status(response.status).send(response.results);
		});
	}
	else
	{
		console.log('getPlaylistGenres: user was not logged in');
		res.status(400);
		res.send({"error":"TODO: GET BACK TO THIS"});
	}
});

app.get('/api/getPlaylistAudioFeatures', function(req, res) {
	logRequest(req);
	console.log("received a request to getPlaylistAudioFeatures");
	if(!req.query.id) {
		console.log('getPlaylistAudioFeatures: no playlist id was provided');
		res.status(400);
		res.send({"error":"Must provide playlist id as a parameter."});
	}
	else if(req.musicMgr && req.musicMgr.auth_token) {
		Spotify.getPlaylistAudioFeatures(req.musicMgr.userDetails.id, req.query.id, req.musicMgr.auth_token, function (response) {
			console.log('call to getPlaylistAudioFeatures completing');
			res.status(response.status).send(response.results);
		});
	}
	else
	{
		console.log('getPlaylistAudioFeatures: user was not logged in');
		res.status(400);
		res.send({"error":"TODO: GET BACK TO THIS"});
	}
});

app.get('/api/setJukeboxPlaylist', function(req, res) {
	logRequest(req);
	console.log("received a request to setJukeboxPlaylist");
	if(!req.query.id) {
		console.log('setJukeboxPlaylist: no playlist id was provided');
		res.status(400);
		res.send({"error":"Must provide playlist id as a parameter."});
	}
	else if(req.musicMgr && req.musicMgr.auth_token) {
		req.musicMgr.activePlaylistId = req.query.id;
		res.status(200).send("");
	}
	else
	{
		console.log('getPlaylistAudioFeatures: user was not logged in');
		res.status(400);
		res.send({"error":"TODO: GET BACK TO THIS"});
	}
});

app.get('/api/getDashboardContent', function(req, res) {
	logRequest(req);
	console.log("received a request to getDashboardContent");
	if(!req.query.id) {
		console.log('getDashboardContent: no playlist id was provided');
		res.status(400);
		res.send({"error":"Must provide playlist id as a parameter."});
	}
	else if(req.musicMgr && req.musicMgr.auth_token) {
		let playlistDetailsPromise = Spotify.getPlaylistDetails(req.musicMgr.userDetails.id, req.query.id, req.musicMgr.auth_token);
		let playbackDetailsPromise = Spotify.getPlaybackDetails(req.musicMgr.auth_token);
		Promise.all([playlistDetailsPromise, playbackDetailsPromise])
			.then( ([playlistDetailsResponse, playbackDetailsResponse] ) => {
				let responseObject = {
					playbackDetails: JSON.parse(playbackDetailsResponse),
					activePlaylistDetails: JSON.parse(playlistDetailsResponse)
				};
				res.status(200).send(responseObject);
			}).catch( reason => {
				console.log('getDashboardContent: failed with reason ' + reason);
				res.status(400);
				res.send({"error": "Something should go here"});
			});
	}
	else
	{
		res.status(400);
		res.send({"error":"TODO: GET BACK TO THIS"});
	}
});

app.get('/api/getManagedPlaylist', function(req, res) {
	logRequest(req);
	console.log('Received a request to getManagedPlaylist endpoint');
	if(req.query.id) {
		if (!getAuthTokenForPlaylist(req.query.id)) {
			res.status(403);
			res.send("error": "Playlist host not logged in");
			return;
		}
		let authToken = getAuthTokenForPlaylist(req.query.id);
		let playlist = getManagedPlaylistById(req.query.id);
		if (playlist) {
			req.musicMgr.hostPlaylistId = playlist.id;
			res.status(200);
			res.send(playlist);
		} else {
			res.status(404);
			res.send({"error":`Could not find playlist matching id ${req.query.id}`})
		}
	} else if(req.musicMgr && req.musicMgr.userDetails) {
		res.status(200);
		res.send(getManagedPlaylistForUser(req.musicMgr));
	} else {
		console.log('getPlaylists: user was not logged in');
		res.status(401);
		res.send({"error":"User Not Logged In"});
	}
});

app.get('/api/createManagedPlaylist', function(req, res) {
	console.log('Received a request to createManagedPlaylist endpoint');
	if(req.musicMgr && req.musicMgr.userDetails.id) {
		createNewPlaylistForUser(req.musicMgr)
			.then((response) => {
				res.status(200).send(response);
			})
			.catch((error) => {
				res.status(error.status_code).send(error);
			});
	} else {
		console.log('getPlaylists: user was not logged in');
		res.status(401);
		res.send({"error":"User Not Logged In"});
	}
});

let wsConnection = null;

app.ws('/ws/ping', (ws, req) => {	
	registerNewClient(ws);
});

app.get('/api/broadcast', (req, res) => {
	logRequest(req);
	broadcastToClients("sending you a message");
	res.status(200);
	res.send({"status":"okay"});
})

app.get('/api/songRequest', (req, res) => {
	logRequest(req);
	console.log('received a request to songRequest');
	if(!req.query.playlistId) {
		res.status(400);
		res.send({'error': 'no playlistId query parameter provided'});
	} else if (!req.query.songURI) {
		res.status(400);
		res.send({'error': 'no songId query parameter provided'});
	} else {
		addSongToPlaylist(req.query.playlistId, req.query.songURI).then((result) => {
			res.status(200);
			res.send(result)
		}).catch(error => {
			res.status(error.status_code);
			res.send(error);
		});
	}
})

app.use(express.static('dist'));


let buildReduxState = (req) => {
	let hostPlaylist = null;
	if (req.musicMgr &&
		req.musicMgr.hostPlaylistId &&
		getAuthTokenForPlaylist(req.musicMgr)) {
		managedPlaylist = getManagedPlaylistById(req.musicMgr.hostPlaylistId);
	}
	return ({
		loginState: {
			loggedIn: req.musicMgr && 
				typeof req.musicMgr.auth_token !== 'undefined'
		},
		dashboardState: {
			managedPlaylist: hostPlaylist ||
				getManagedPlaylistForUser(req.musicMgr),
			hostDomain: process.env.HOST_DOMAIN
		}
	});
}

app.get('/*', (req, res) => {
	const context = {};

	const store = createStore(RootReducer, buildReduxState(req));
	const markup = renderToString(
		<Provider store={store}>
			<StaticRouter location={req.url} context={context}>
				<MusicMgrApp />
			</StaticRouter>
		</Provider>
	);
	const finalState = store.getState();
	return res.render('index.ejs', { 
		reactOutput: markup,
		reduxState: JSON.stringify(finalState)
	});
});

let listenPort = process.env.PORT || '3000';

app.listen(listenPort, function() {
	console.log(`running on port ${listenPort}`);
});