import React from 'react';
import IndividualPlaylist from './IndividualPlaylist';
import { connect } from 'react-redux';
import { doFetchPlaylistDetails } from '../../actions';

const mapStateToProps = (state, ownProps) => ({
	playlistObject: ownProps.playlistObject,
	isActive: ownProps.active
})

const mapDispatchToProps = (dispatch, ownProps) => ({
	onPlaylistClick: (e) => {
		e.preventDefault();
		dispatch(doFetchPlaylistDetails(ownProps.playlistObject.id));
  	}
})

const IndividualPlaylistContainer = connect(mapStateToProps, mapDispatchToProps)(IndividualPlaylist);

export default IndividualPlaylistContainer;