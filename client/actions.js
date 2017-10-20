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
			uri: 'http://localhost:3000/api/searchByType',
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
			uri: 'http://localhost:3000/api/getPlaylists',
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
			uri: 'http://localhost:3000/api/logout'
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
			uri: 'http://localhost:3000/api/getPlaylistGenres',
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
			uri: 'http://localhost:3000/api/getPlaylistAudioFeatures',
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