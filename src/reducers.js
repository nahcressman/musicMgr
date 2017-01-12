import { combineReducers } from 'redux'
import { REQUEST_SPOTIFY_RESULTS, RECEIVE_SPOTIFY_RESULTS} from './actions'

const defaultSingleSearchTypeState = {
	isFetching: false,
	items: []
};

function spotifySingleSearchType(state = defaultSingleSearchTypeState, action) {
	switch (action.type) {
		case REQUEST_SPOTIFY_RESULTS:
			return Object.assign({}, state, {
				isFetching: true,
			});
		case RECEIVE_SPOTIFY_RESULTS:
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
		case REQUEST_SPOTIFY_RESULTS:
		case RECEIVE_SPOTIFY_RESULTS:
			return Object.assign({}, state, {
				[action.searchType]: spotifySingleSearchType(state[action.searchType], action)
			});
		default:
			return state;
	}
}

const rootReducer = combineReducers({
	spotifySearch
});

export default rootReducer