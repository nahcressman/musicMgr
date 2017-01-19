import rp from 'request-promise';

export const REQUEST_SPOTIFY_RESULTS = 'REQUEST_SPOTIFY_RESULTS'
export const RECEIVE_SPOTIFY_RESULTS = 'RECEIVE_SPOTIFY_RESULTS'

export function requestFromSpotify(searchType, query) {
	return { 
		type: REQUEST_SPOTIFY_RESULTS,
		searchType,
		query
	}
}

export function receiveFromSpotify(searchType, json) {
	return {
		type: RECEIVE_SPOTIFY_RESULTS,
		searchType,
		results: json
	}
}

export function doSpotifySearch(searchType, query) {
	return function (dispatch) {
		dispatch(requestFromSpotify(searchType, query));

		rp({
			uri: 'http://localhost:3000/searchByType',
			qs: {q: query, searchType: searchType},
			json: true
		}).then(response => {
			dispatch(receiveFromSpotify(searchType, response))
		});
	}
}

export function doSpotifyLogin(code) {
	console.log("doSpotifyLogin, code is" + code);
}
