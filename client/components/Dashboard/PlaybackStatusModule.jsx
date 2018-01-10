import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PlaybackStatusModule extends Component {
	
	getUpcomingTracks() {
		let {
			upcomingTracks
		} = this.props;

		return upcomingTracks &&
			upcomingTracks.map( (individualTrack) => (
				<li key={individualTrack.track.id}>{individualTrack.track.name}</li>
			));
	}

	render() {
		let {
			isPlaying,
			upcomingTracks,
			currentPlayingTrack
		} = this.props;

		return (
			isPlaying ? 
				<div>
					<h3>Current Playing Track: {currentPlayingTrack}</h3>
					<div>
						<h3>Upcoming Tracks:</h3>
						<ul>
							{this.getUpcomingTracks()}
						</ul>
					</div>
				</div>
				:
				<h3>Jukebox is not currently playing</h3>
		);
	}
}

PlaybackStatusModule.PropTypes = {
	isPlaying: PropTypes.bool,
	upcomingTracks: PropTypes.array,
	currentPlayingTrack: PropTypes.object
};

export default PlaybackStatusModule;
