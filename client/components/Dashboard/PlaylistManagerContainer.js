import React from 'react';
import {connect} from 'react-redux';
import PlaylistManager from './PlaylistManager';
import {doFetchManagedPlaylist,
		doCreateManagedPlaylist,
		doSpotifyLogout} from '../../actions';


const mapDispatchToProps = (dispatch) => ({
	fetchManagedPlaylist: () => dispatch(doFetchManagedPlaylist()),
	createManagedPlaylist: () => dispatch(doCreateManagedPlaylist()),
	logout: () => dispatch(doSpotifyLogout)
});

const mapStateToProps = (state) => ({
	managedPlaylist: state.dashboardState.managedPlaylist,
	isFetching: state.dashboardState.isFetching
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistManager);