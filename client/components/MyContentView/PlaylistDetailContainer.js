import React from 'react';
import PlaylistList from './PlaylistList';
import PlaylistGenreContainer from './PlaylistGenreContainer';
import PlaylistFeatureContainer from './PlaylistFeatureContainer';

import { connect } from 'react-redux';

const mapStateToProps = (state) => {
	return {
		activeView: state.spotifyMyContent.activeView
	};
}

let PlaylistDetailContainer = ( {activeView} ) => (
	<div className="detailContainer">
		<PlaylistGenreContainer />
		<PlaylistFeatureContainer />
	</div>
)

PlaylistDetailContainer = connect(mapStateToProps)(PlaylistDetailContainer);
export default PlaylistDetailContainer;