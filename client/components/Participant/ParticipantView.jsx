import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PlaylistManagerContainer from '../Dashboard/PlaylistManagerContainer';
import SessionSelectionFormContainer from './SessionSelectionFormContainer';

class ParticipantView extends Component {
	
	render() {
		let {
			managedPlaylist
		} = this.props;

		return (
			managedPlaylist ? 
				<PlaylistManagerContainer /> :
				<SessionSelectionFormContainer />
		);
	}
}

ParticipantView.PropTypes = {
	managedPlaylist: PropTypes.object
};

export default ParticipantView;
