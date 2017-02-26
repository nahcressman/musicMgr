import React from 'react';
import PlaylistList from './PlaylistList';

import { connect } from 'react-redux';

const getResultsFromState = (resultSet) => resultSet ? resultSet.items : [];

const mapStateToProps = (state) => {
	return {
		playlists: getResultsFromState(state.spotifyMyContent['playlists']),
		activePlaylistId: state.spotifyMyContent.activePlaylistId
	};
};

const PlaylistListContainer = connect(mapStateToProps)(PlaylistList);

export default PlaylistListContainer;