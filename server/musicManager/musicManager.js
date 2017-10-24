import Spotify from '../lib/spotify';
import fs from 'fs';

const CACHE_FILENAME = 'musicManagerCache.json';

let dataCache = {};
fs.readFile(CACHE_FILENAME, (err, data) => {
	if (err) {
		console.log('musicManager: ERROR READING CACHE: ' + err.toString());
	} else {
		dataCache = JSON.parse(data);
		console.log('musicManager: Cache has been loaded from file');
	}
})

const dumpToCache = () => {
	fs.writeFile(CACHE_FILENAME, JSON.stringify(dataCache), (err) => {
	  if (err) {
	  	console.log('musicManager; ERROR WRITING CACHE: ' + err.toString());
	  };
	  console.log('musicManager: Cache has been written');
	});
}

const PLAYLIST_NAME = 'JUKEBOX APP PLAYLIST';

const DEFAULT_PLAYLIST = {
	id: undefined,
	upcomingSongs: [],
	spotifyPlaylistDetails: undefined,
	spotifyUserId: undefined,
};

//returns a promise with result of spotify playlist endpoint
const getUsersPlaylistFromSpotify = (session, spotifyPlaylistId) => {
	return Spotify.getOnePlaylist(session.userDetails.id, spotifyPlaylistId, session.auth_token);
};

//returns a promise with result of creating new spotify playlist
const createNewPlaylistOnSpotify = (session, identifier) => {
	const PLAYLIST_DESCRIPTION = `Playlist managed by jukebox app. id ${identifier}`;
	return Spotify.createNewPlaylist(session.userDetails.id, session.auth_token, PLAYLIST_NAME, PLAYLIST_DESCRIPTION);
};

//returns a promise with result of creating a new entry for music manager to manage
const generateNewPlaylistEntry = (session) => {
	let newIdentifier = new Date().getTime().toString(32);
	return createNewPlaylistOnSpotify(session, newIdentifier)
		.then( (response) => {
			dataCache[session.userDetails.id] = Object.assign({}, DEFAULT_PLAYLIST, {
				id: newIdentifier,
				spotifyUserId: session.userDetails.id,
				spotifyPlaylistDetails: response
			});
			dumpToCache();
			return dataCache[session.userDetails.id];
		}).catch( (error) => {
			console.log('generateNewPlaylistEntry failed.')
			console.log(error);
		})
};

//returns a promise indicating whether the user had a playlist or not
export const createNewPlaylistForUser = (session) => {
	//check if we are managing a playlist for the user
	let existingPlaylist = dataCache[session.userDetails.id];
	//verify that the playlist still exists, otherwise we need to make a new one
	if (existingPlaylist) {
		return getUsersPlaylistFromSpotify(session, existingPlaylist.spotifyPlaylistDetails.id)
			.then((response) => Promise.reject( {status_code: 500, error: 'User already has playlist'} ))
			.catch((error) => {
				if (error.response_code === 404) {
					return generateNewPlaylistEntry(session);
				} else {
					//something else happened...
					return Promise.reject(error);
				}
			});
	}
	return generateNewPlaylistEntry(session);
};

//returns whether or not we are currently managing a playlist for the user
export const getManagedPlaylistForUser = (session) => {
	return dataCache[session.userDetails.id];
}