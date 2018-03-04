import rp from 'request-promise';

export const REQUEST_SPOTIFY_RESULTS = 'REQUEST_SPOTIFY_RESULTS';
export const RECEIVE_SPOTIFY_RESULTS = 'RECEIVE_SPOTIFY_RESULTS';
export const REQUEST_MY_CONTENT = 'REQUEST_MY_CONTENT';
export const RECEIVE_MY_CONTENT = 'RECEIVE_MY_CONTENT';
export const BEGIN_SPOTIFY_LOGOUT = 'BEGIN_SPOTIFY_LOGOUT';
export const CONFIRM_SPOTIFY_LOGOUT = 'CONFIRM_SPOTIFY_LOGOUT';
export const REQUEST_PLAYLIST_GENRES = 'REQUEST_PLAYLIST_GENRES';
export const RECEIVE_PLAYLIST_GENRES = 'RECEIVE_PLAYLIST_GENRES';
export const REQUEST_PLAYLIST_FEATURES = 'REQUEST_PLAYLIST_FEATURES';
export const RECEIVE_PLAYLIST_FEATURES = 'RECEIVE_PLAYLIST_FEATURES';
export const SET_NAVIGATION_STATE = 'SET_NAVIGATION_STATE';
export const SET_ACTIVE_MY_CONTENT_VIEW = 'SET_ACTIVE_MY_CONTENT_VIEW';
export const SET_ACTIVE_PLAYLIST_ID = 'SET_ACTIVE_PLAYLIST_ID';
export const TOGGLE_GENRE_EXPAND = 'TOGGLE_GENRE_EXPAND';
export const ACTIVE_JUKEBOX_PLAYLIST_CHANGED = 'ACTIVE_JUKEBOX_PLAYLIST_CHANGED';
export const REQUEST_MANAGED_PLAYLIST = 'REQUEST_MANAGED_PLAYLIST';
export const RECEIVE_MANAGED_PLAYLIST = 'RECEIVE_MANAGED_PLAYLIST';
export const REQUEST_CREATE_MANAGED_PLAYLIST = 'REQUEST_CREATE_MANAGED_PLAYLIST';
export const RECEIVE_CREATE_MANAGED_PLAYLIST = 'RECEIVE_CREATE_MANAGED_PLAYLIST';
export const RECEIVE_PLAYBACK_UPDATE_FROM_SERVER = 'RECEIVE_PLAYBACK_UPDATE_FROM_SERVER';
export const WEBSOCKET_OPEN = 'WEBSOCKET_OPEN';
export const SUBMIT_SONG_REQUEST = 'SUBMIT_SONG_REQUEST';
export const COMPLETE_SONG_REQUEST = 'COMPLETE_SONG_REQUEST';
export const RESET_SESSION_SELECTION_ERRORS = 'RESET_SESSION_SELECTION_ERRORS';

function requestFromSpotify(searchType, query) {
	return { 
		type: REQUEST_SPOTIFY_RESULTS,
		searchType,
		query
	};
}

function receiveFromSpotify(searchType, json) {
	return {
		type: RECEIVE_SPOTIFY_RESULTS,
		searchType,
		results: json
	};
}

export function doSpotifySearch(searchType, query) {
	return function (dispatch) {
		dispatch(requestFromSpotify(searchType, query));

		rp({
			uri: HOST_DOMAIN + 'api/searchByType',
			qs: {q: query, searchType: searchType},
			json: true
		}).then(response => {
			dispatch(receiveFromSpotify(searchType, response))
		});
	};
}

export function requestMyContent(contentType) {
	return {
		type: REQUEST_MY_CONTENT,
		contentType
	};
}

export function receiveMyContent(contentType, json) {
	return {
		type: RECEIVE_MY_CONTENT,
		contentType,
		results: json.results,
		loggedIn: json.loggedIn
	}
}

export function doSpotifyMyContent(contentType) {
	return function (dispatch) {
		dispatch(requestMyContent(contentType));

		rp({
			uri: HOST_DOMAIN + 'api/getPlaylists',
			json: true
		}).then(response => {
			dispatch(receiveMyContent(contentType, {
				results: response,
				loggedIn: true
			}));
		}).catch(reason => {
			dispatch(receiveMyContent(contentType, {
				results: [],
				loggedIn: reason.statusCode !== 401
			}));
		});

	}
}

export function startSpotifyLogout() {
	return {
		type: BEGIN_SPOTIFY_LOGOUT
	}
}

export function confirmSpotifyLogout() {
	return {
		type: CONFIRM_SPOTIFY_LOGOUT
	};
}

export function doSpotifyLogout() {
	return function(dispatch) {
		dispatch(startSpotifyLogout());

		rp({
			uri: HOST_DOMAIN + 'api/logout'
		}).then(response => {
			dispatch(confirmSpotifyLogout());
		})
	}
}

export function setActivePlaylistId(playlistId) {
	return {
		type: SET_ACTIVE_PLAYLIST_ID,
		id: playlistId
	};
}

export function requestPlaylistGenres(playlistId) {
	return {
		type: REQUEST_PLAYLIST_GENRES,
		id: playlistId
	};
}

export function receivePlaylistGenres(playlistId, json) {
	return {
		type: RECEIVE_PLAYLIST_GENRES,
		id: playlistId,
		details: json
	}
}

export function requestPlaylistFeatures(playlistId) {
	return {
		type: REQUEST_PLAYLIST_FEATURES,
		id: playlistId
	};
}

export function receivePlaylistFeatures(playlistId, json) {
	return {
		type: RECEIVE_PLAYLIST_FEATURES,
		id: playlistId,
		details: json
	}
}

export function doFetchPlaylistDetails(playlistId) {
	return function(dispatch) {
		dispatch(setActivePlaylistId(playlistId));
		dispatch(requestPlaylistGenres(playlistId));
		dispatch(requestPlaylistFeatures(playlistId));

		rp({
			uri: HOST_DOMAIN + 'api/getPlaylistGenres',
			qs: {id: playlistId}
		}).then(response => {
			dispatch(receivePlaylistGenres(playlistId, JSON.parse(response)));
		}).catch(reason => {
			dispatch(receivePlaylistGenres(playlistId, {
				results: [],
				loggedIn: reason.statusCode !== 401
			}));
		});

		rp({
			uri: HOST_DOMAIN + 'api/getPlaylistAudioFeatures',
			qs: {id: playlistId}
		}).then(response => {
			dispatch(receivePlaylistFeatures(playlistId, JSON.parse(response)));
		}).catch(reason => {
			dispatch(receivePlaylistFeatures(playlistId, {
				features: {},
				loggedIn: reason.statusCode !== 401
			}));
		});

	}
}

export function setNavigationState(destination) {
	return {
		type: SET_NAVIGATION_STATE,
		navState: destination
	};
}

export function setActiveMyContentView(activeView) {
	return {
		type: SET_ACTIVE_MY_CONTENT_VIEW,
		activeView: activeView
	}
}

export function toggleGenreExpand() {
	return {
		type: TOGGLE_GENRE_EXPAND
	}
}

export function fetchPaneData(destinationPane) {
	return function (dispatch) {
		switch (destinationPane) {
			case 'MY_CONTENT':
				dispatch(doSpotifyMyContent('playlists'));
			default:
				return;
		}
	}
}

export function requestManagedPlaylist() {
	return {
		type: REQUEST_MANAGED_PLAYLIST,
	}
}

export function receiveManagedPlaylist(json) {
	return {
		type: RECEIVE_MANAGED_PLAYLIST,
		playlist: json
	};
}

export function doFetchManagedPlaylist(playlistId) {
	return (dispatch) => {
		dispatch(requestManagedPlaylist());

		rp({
			uri: HOST_DOMAIN + 'api/getManagedPlaylist',
			qs: {
				id: playlistId
			}
		}).then( response => {
			dispatch(receiveManagedPlaylist(JSON.parse(response)));
		}).catch( error => {
			dispatch(receiveManagedPlaylist(undefined));
			if(error.statusCode === 401) {
				dispatch(confirmSpotifyLogout());
			}
			if(error.statusCode === 403) {
				dispatch(receiveManagedPlaylist({
					error: "SESSION_NOT_ACTIVE"
				}));
			}
		});
	};
}

export function requestCreateManagedPlaylist() {
	return ({
		type: REQUEST_CREATE_MANAGED_PLAYLIST
	});
}

export function receiveCreateManagedPlaylist(playlist) {
	return ({
		type: RECEIVE_CREATE_MANAGED_PLAYLIST,
		playlist: playlist
	})
}

export function doCreateManagedPlaylist(playlistId) {
	return (dispatch) => {
		dispatch(requestCreateManagedPlaylist());

		rp({
			uri: HOST_DOMAIN + 'api/createManagedPlaylist',
		}).then( response => {
			dispatch(receiveCreateManagedPlaylist(JSON.parse(response)));
		}).catch( error => {
			console.log('doCreateManagedPlaylist error')
			dispatch(receiveCreateManagedPlaylist(undefined));
			if(error.statusCode === 401) {
				dispatch(confirmSpotifyLogout());
			}
		});
	}
}

export function receivePlaybackUpdateFromServer(updateData) {
	return ({
		type: RECEIVE_PLAYBACK_UPDATE_FROM_SERVER,
		updateData: updateData
	});
}

export function webSocketOpen(websocket) {
	return ({
		type: WEBSOCKET_OPEN,
		websocket: websocket
	});
}

export function submitSongRequest(uri) {
	return ({
		type: SUBMIT_SONG_REQUEST,
		uri: uri
	});
}

export function completeSongRequest(uri) {
	return ({
		type: COMPLETE_SONG_REQUEST,
		uri: uri
	});
}

export function doSongRequest(playlistId, songURI) {
	return (dispatch) => {
		dispatch(submitSongRequest(songURI));

		rp({
			uri: HOST_DOMAIN + 'api/songRequest',
			qs: {
				playlistId: playlistId,
				songURI: songURI
			}
		}).then( response => {
			dispatch(completeSongRequest(songURI));
		}).catch( error => {
			console.log(`doSongRequest error: ${error}`);
		});
	}
}

export function resetSessionSelectionErrors() {
	return ({
		type: RESET_SESSION_SELECTION_ERRORS
	});
}