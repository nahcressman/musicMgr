import express from 'express';
import sessions from 'client-sessions';
import historyApiFallback from 'connect-history-api-fallback';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import AppRoot from '../client/AppRoot';
import Spotify from './lib/spotify';

import dotenv from 'dotenv';
dotenv.config();

var sendJSONResult = function(response, resultsToSend) {
	response.setHeader("Content-Type", "application/json");
	response.send(resultsToSend != null ? resultsToSend : {});
}

var app = express();
var project_base_path = require('path').resolve(__dirname, '..')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

console.log(process.env)

app.use(sessions({
	cookieName: 'musicMgr', // cookie name dictates the key name added to the request object 
	secret: process.env.MM_SESSION_SECRET, // should be a large unguessable string 
	duration: 24 * 60 * 60 * 1000, // how long the session will stay valid in ms 
}));

app.use(function(req,res,next) { 
	if(req.musicMgr) {
		console.log("User has a previous session stored. id: " + req.musicMgr.userId);
		var now = new Date();
		if(req.musicMgr.expirationTime < now) {
			console.log("auth token expired, resetting session")
			req.musicMgr.reset();
		}
	}
	
	next();
});

app.get('/api/searchByType', function(req, res) {
	var queryText = req.query.q;
	var searchType = req.query.searchType;
	if(req.musicMgr && req.musicMgr.auth_token)
	{
		if(queryText) {
			Spotify.searchByType(queryText, searchType, req.musicMgr.auth_token, function(results) {
				console.log("inside callback for /searchByType");
				sendJSONResult(res, results);
			});	
		}
		else {
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
			req.musicMgr.auth_token = auth_token;
			Spotify.getUserDetails(auth_token, function(details) {
				if(details && details.email) {
					console.log("got user id, it's " + details.id);
					req.musicMgr.userId = details.id;
					console.log("got user email. it's " + details.email);
					req.musicMgr.email = details.email;
					console.log("got expiration time. it's " + expirationTime);
					req.musicMgr.expirationTime = expirationTime;
				}
				res.redirect('/')
			});
		}		
		else {
			res.redirect('/');
		}
	});
});
app.get('/api/getPlaylists', function(req, res) {
	console.log("received a request to getPlaylists");
	if(req.musicMgr && req.musicMgr.auth_token)
	{
		Spotify.getUserPlaylists(req.musicMgr.userId, req.musicMgr.auth_token, function (response) {
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
	console.log("received a request to logout");
	if(req.musicMgr) {
		req.musicMgr.reset();
	}
	res.status(200).send("");
});
app.get('/api/getUserDetails', function(req, res) {
	console.log("received a request to getUserDetails");
	if(req.musicmgr) {
		
	}
});
app.get('/api/getPlaylistGenres', function(req, res) {
	console.log("received a request to getPlaylistGenres");
	if(!req.query.id) {
		console.log('getPlaylistGenres: no playlist id was provided');
		res.status(400);
		res.send({"error":"Must provide playlist id as a parameter."});
	}
	else if(req.musicMgr && req.musicMgr.auth_token) {
		Spotify.getPlaylistGenres(req.musicMgr.userId, req.query.id, req.musicMgr.auth_token, function (response) {
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
	console.log("received a request to getPlaylistAudioFeatures");
	if(!req.query.id) {
		console.log('getPlaylistAudioFeatures: no playlist id was provided');
		res.status(400);
		res.send({"error":"Must provide playlist id as a parameter."});
	}
	else if(req.musicMgr && req.musicMgr.auth_token) {
		Spotify.getPlaylistAudioFeatures(req.musicMgr.userId, req.query.id, req.musicMgr.auth_token, function (response) {
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

app.get('/', (returnq, res) => {
	const markup = renderToString(<AppRoot />);
	return res.render('index.ejs', { reactOutput: markup });
});
// app.use(webpackInstance);
// app.use(historyApiFallback());
// app.use(webpackInstance);

app.use(express.static('dist'));

app.listen('3000', function() {
	console.log('Running on port 3000');
});