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

const defaultLoginState = {
	loggedIn: false
}

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


const defaultDashboardState = {
	isFetching: false,
	activePlaylistId: undefined,
	managedPlaylist: undefined,
	websocket: undefined
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
				items: action.results.map( (track) => Object.assign(track, {isFetching: false}))
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
		case actionCreators.SUBMIT_SONG_REQUEST:
			return Object.assign({}, state, {
				track: {
					items: state.track.items.map( (track) => (
						Object.assign(track, {isFetching: track.uri === action.uri})))
				}
			});
		case actionCreators.COMPLETE_SONG_REQUEST:
			return Object.assign({}, state, {
				track: {
					items: state.track.items.map( (track) => (
						Object.assign(track, {isRequesting: false})))
				}
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

function loginState(state = defaultLoginState, action) {
	switch (action.type) {
		case actionCreators.CONFIRM_SPOTIFY_LOGOUT:
			return Object.assign({}, state, {
				loggedIn: false
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

function dashboardState(state = defaultDashboardState, action) {
	switch (action.type) {
		case actionCreators.ACTIVE_JUKEBOX_PLAYLIST_CHANGED:
			return Object.assign({}, state, {
				activePlaylistId: action.id
			});
		case actionCreators.REQUEST_MANAGED_PLAYLIST:
		case actionCreators.REQUEST_CREATE_MANAGED_PLAYLIST:
			return Object.assign({}, state, {
				isFetching: true
			});
		case actionCreators.RECEIVE_MANAGED_PLAYLIST:
		case actionCreators.RECEIVE_CREATE_MANAGED_PLAYLIST:
			return Object.assign({}, state, {
				isFetching: false,
				managedPlaylist: action.playlist,
			});
		case actionCreators.RECEIVE_PLAYBACK_UPDATE_FROM_SERVER:
			return Object.assign({}, state, {
				managedPlaylist: action.updateData
			});
		case actionCreators.WEBSOCKET_OPEN:
			return Object.assign({}, state, {
				websocket: action.websocket
			});
		default:
			return state;
	}
}

const rootReducer = combineReducers({
	dashboardState,
	spotifySearch,
	spotifyMyContent,
	loginState,
	navigationState,
	playlistGenres,
	playlistFeatures
});

export default rootReducer