import Spotify from '../lib/spotify';
import fs from 'fs';

const CACHE_FILENAME = 'musicManagerCache.json';

let dataCache = {};
let authTokens = {};
let websocketClients = [];

const managerWorkload = () => {
	//TODO: next make this query the server once every couple of seconds to populate the current playing song, and the upcoming tracks on the list.
	Object.keys(dataCache).forEach((key) => {
		let dataCacheEntry = dataCache[key];
		let authTokenEntry = authTokens[key];
		if (authTokenEntry &&
			authTokenEntry.expirationTime > new Date().getTime()) {
			//first make sure that the playlist exists, and get its current tracks
			Spotify.getGenericSpotifyUrl(dataCacheEntry.spotifyPlaylistDetails.tracks.href, authTokenEntry.auth_token).then( (trackResults) => {
				Spotify.getPlaybackDetails(authTokenEntry.auth_token).then( (playbackDetails) => {
					dataCacheEntry.playbackDetails = playbackDetails;
					if (playbackDetails.is_playing &&
						playbackDetails.context &&
						playbackDetails.context.type === 'playlist' &&
						playbackDetails.context.uri === dataCacheEntry.spotifyPlaylistDetails.uri) {
						Spotify.getGenericSpotifyUrl(dataCacheEntry.spotifyPlaylistDetails.tracks.href, authTokenEntry.auth_token).then( (trackResults) => {
							let currentPlayingIndex = trackResults.items.findIndex( (item) => item.track.id === playbackDetails.item.id);
							dataCacheEntry.upcomingTracks = trackResults.items.slice(currentPlayingIndex+1);
						});
					} else {
						dataCacheEntry.upcomingTracks = [];
						dataCacheEntry.playbackDetails = undefined;
					}
				}).catch((error) => {
					console.log('do something here');
				});
			});
		}
	});
};

const dumpToCache = () => {
	fs.writeFile(CACHE_FILENAME, JSON.stringify(dataCache), (err) => {
	  if (err) {
	  	console.log('musicManager; ERROR WRITING CACHE: ' + err.toString());
	  };
	  console.log('musicManager: Cache has been written');
	});
};

const PLAYLIST_NAME = 'JUKEBOX APP PLAYLIST';

const DEFAULT_PLAYLIST = {
	id: undefined,
	upcomingTracks: [],
	spotifyPlaylistDetails: undefined,
	spotifyUserId: undefined,
	playbackDetails: undefined
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
			storeAuthTokensFromSession(session);
			dumpToCache();
			return dataCache[session.userDetails.id];
		}).catch( (error) => {
			console.log('generateNewPlaylistEntry failed.')
			console.log(error);
		})
};

const storeAuthTokensFromSession = (session) => {
	if( session &&
		session.userDetails) {
		authTokens[session.userDetails.id] = {
			auth_token: session.auth_token,
			refresh_token: session.refresh_token,
			expirationTime: session.expirationTime
		};
	}
}

export const initializeMusicManager = () => {
	fs.readFile(CACHE_FILENAME, (err, data) => {
		if (err) {
			console.log('musicManager: ERROR READING CACHE: ' + err.toString());
		} else {
			try {
				dataCache = JSON.parse(data);
				console.log('musicManager: Cache has been loaded from file');
			} catch (e) {
				dataCache = {};
				console.log('musicManager: Could not parse contents of cache, starting over');
			}
		}
	})

	setInterval(managerWorkload, 5000);
}

//returns a promise indicating whether the user had a playlist or not
export const createNewPlaylistForUser = (session) => {
	storeAuthTokensFromSession(session);
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
	storeAuthTokensFromSession(session);

	return session.userDetails &&
			dataCache[session.userDetails.id];

};

//checks whether we have a playlist in the cache for a specific id
export const getManagedPlaylistById = (id) => {
	if(typeof id === 'string' &&
		id.length === 4) {
		return Object.values(dataCache).find( (cacheEntry) => cacheEntry.id.toUpperCase().startsWith(id) );
	}
}

const getStatusUpdateForPlaylist = (playlist) => {
	let cachedPlaylistData = dataCache[playlist.spotifyUserId];
	return cachedPlaylistData ? cachedPlaylistData : undefined;

};

// {
// 	type: 'STATUS_UPDATE',
// 	playlist: this.props.managedPlaylist
// }

const messageHandler = (websocket, message) => {
	if (message &&
		message.data) {
		let jsonData = JSON.parse(message.data);
		switch (jsonData.type) {
			case 'STATUS_UPDATE':
				let cachedPlaylistData = getStatusUpdateForPlaylist(jsonData.playlist);
				if (cachedPlaylistData) {
					websocket.send(JSON.stringify(cachedPlaylistData));
				} else {
					websocket.send(JSON.stringify({
						'error': 'could not find playlist data for this playlist'
					}));
				}
				break;
			default:
				return;
		}
	}
}

export const registerNewClient = (websocket) => {
	websocket.onclose = () => {
		websocketClients = websocketClients.filter( (ws) => ws !== websocket );
	};
	websocket.onmessage = (message) => messageHandler(websocket, message);
	websocketClients.push(websocket);
};

export const broadcastToClients = (message) => {
	websocketClients.forEach( ws => ws.send(message) );
};

export const addSongToPlaylist = (playlistId, songURI) => {
	//addSongToPlaylist: (userId, authToken, playlistId, songURI) => {

	let userId = null,
		authToken = null,
		spotifyPlaylistId = null;

	Object.keys(dataCache).forEach( (userIdKey) => {
		if(dataCache[userIdKey].id === playlistId) {
			userId = userIdKey;
			authToken = authTokens[userIdKey].auth_token;
			spotifyPlaylistId = dataCache[userIdKey].spotifyPlaylistDetails.id;
		}
	});
	if(!userId) {
		return Promise.reject({'error': 'The playlist data could not be found'});
	} else if (!authToken) {
		return Promise.reject({'error': 'Unauthorized. Playlist owner should re-host'});
	} else {
		return Spotify.addSongToPlaylist(userId, authToken, spotifyPlaylistId, songURI);
	}
}
