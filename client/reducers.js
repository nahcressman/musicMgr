import { combineReducers } from 'redux'
import * as actionCreators from './actions'

const defaultSingleSearchTypeState = {
	isFetching: false,
	items: []
};

const defaultSingleMyContentTypeState = {
	isFetching: false,
	items: []
};

const defaultSpotifyMyContentState = {
	loggedIn: false,
	activeView: "ATTRIBUTE_VIEW",
	activePlaylistId: null
};

const defaultSpotifyMyContentPlaylistDetailsState = {
	playlistId: null,
	playlistName: null,
	genres: []
};

const defaultPlaylistGenresState = {
	isFetching: false,
	playlistName: null,
	expanded: false
};

const defaultPlaylistFeaturesState = {
	isFetching: false,
	features: null,
	playlistName: null
};

function spotifySearchByType(state = defaultSingleSearchTypeState, action) {
	switch (action.type) {
		case actionCreators.REQUEST_SPOTIFY_RESULTS:
			return Object.assign({}, state, {
				isFetching: true,
			});
		case actionCreators.RECEIVE_SPOTIFY_RESULTS:
			return Object.assign({}, state, {
				isFetching: false,
				items: action.results
			});
		default:
			return state;
	}
}

function spotifySearch(state = {}, action) {
	switch (action.type) {
		case actionCreators.REQUEST_SPOTIFY_RESULTS:
		case actionCreators.RECEIVE_SPOTIFY_RESULTS:
			return Object.assign({}, state, {
				[action.searchType]: spotifySearchByType(state[action.searchType], action)
			});
		default:
			return state;
	}
}



function spotifyMyContentByContentType(state = defaultSingleMyContentTypeState, action) {
	switch (action.type) {
		case actionCreators.REQUEST_MY_CONTENT:
			return Object.assign({}, state, {
				isFetching: true,
			});
		case actionCreators.RECEIVE_MY_CONTENT:
			return Object.assign({}, state, {
				isFetching: false,
				items: action.results
			});
		default:
			return state;
	}
}

function spotifyMyContent(state = defaultSpotifyMyContentState, action) {
	switch (action.type) {
		case actionCreators.REQUEST_MY_CONTENT:
		case actionCreators.RECEIVE_MY_CONTENT:
			return Object.assign({}, state, {
				[action.contentType]: spotifyMyContentByContentType(state[action.contentType], action),
				loggedIn: action.loggedIn
			});
		case actionCreators.BEGIN_SPOTIFY_LOGOUT:
			return Object.assign({}, state, {

			});
		case actionCreators.CONFIRM_SPOTIFY_LOGOUT:
			return Object.assign({}, state, {
				loggedIn: false
			});
		case actionCreators.SET_ACTIVE_PLAYLIST_ID:
			return Object.assign({}, state, {
				activePlaylistId: action.id
			});
		default:
			return state;
	}
}

function playlistGenres(state = defaultPlaylistGenresState, action) {
	switch (action.type) {
		case actionCreators.REQUEST_PLAYLIST_GENRES:
			return Object.assign({}, state, {
				activePlaylistId: action.id,
				expanded: false,
				isFetching: true
			});
		case actionCreators.RECEIVE_PLAYLIST_GENRES:
			return Object.assign({}, state, {
				isFetching: false,
				[action.id]: action.details
			});
		case actionCreators.TOGGLE_GENRE_EXPAND:
			return Object.assign({}, state, {
				expanded: !state.expanded
			})
		default:
			return state;
	}
}

function playlistFeatures(state = defaultPlaylistFeaturesState, action) {
	switch (action.type) {
		case actionCreators.REQUEST_PLAYLIST_FEATURES:
			return Object.assign({}, state, {
				activePlaylistId: action.id,
				isFetching: true
			});
		case actionCreators.RECEIVE_PLAYLIST_FEATURES:
			return Object.assign({}, state, {
				isFetching: false,
				[action.id]: action.details
			});
		default:
			return state;
	}
}

function navigationState(state = 'SPOTIFY_SEARCH', action) {
	switch (action.type) {
		case actionCreators.SET_NAVIGATION_STATE:
			return action.navState;
		default:
			return state;
	}
}

const rootReducer = combineReducers({
	spotifySearch,
	spotifyMyContent,
	navigationState,
	playlistGenres,
	playlistFeatures
});

export default rootReducer