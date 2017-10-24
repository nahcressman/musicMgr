import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PlaybackStatusModule extends Component {
	render() {
		let {
			isPlaying,
			currentTrackName
		} = this.props;

		return (
			<div>
				<div>Currently Playing Track</div>
				<div>Current Track Name</div>

				<div>Upcoming Tracks</div>
				<div>Upcoming Track List</div>
			</div>
		);
	}
}

PlaybackStatusModule.PropTypes = {
	isPlaying: PropTypes.bool,
	currentTrackDetails: PropTypes.object
};

export default PlaybackStatusModule;
