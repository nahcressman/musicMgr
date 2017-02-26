import React from 'react';
import { connect } from 'react-redux';

const getPlaylistFeaturesFromState = ( state ) => state ? state.features : [];
const getPlaylistNameFromState = ( state ) => state ? state.playlistName : null;

const mapStateToProps = (state) => {
	return {
		activePlaylistId: state.playlistFeatures.activePlaylistId,
		isFetching: state.playlistFeatures.isFetching,
		playlistFeatures: getPlaylistFeaturesFromState(state.playlistFeatures[state.playlistFeatures.activePlaylistId]),
		playlistName: getPlaylistNameFromState(state.playlistFeatures[state.playlistFeatures.activePlaylistId])
	};
};

let PlaylistFeatureContainer = ( { activePlaylistId, isFetching, playlistFeatures, playlistName } ) => {
	if(isFetching) {
		return (
			<h3>Fetching Playist Features...</h3>
		)
	}
	else if (activePlaylistId) {
		return (
			<div>
				<h4>Features</h4>
				<ul>
					{ 
						playlistFeatures.map( (featureObject) => (
							<li key={ featureObject.name }> { featureObject.name }: {featureObject.value}</li>
						))
					}				
				</ul>
			</div>

		);
	}
	else {
		return (
			<h3>No playlist selected</h3>
		);
	}
}

PlaylistFeatureContainer = connect(mapStateToProps)(PlaylistFeatureContainer);

export default PlaylistFeatureContainer;