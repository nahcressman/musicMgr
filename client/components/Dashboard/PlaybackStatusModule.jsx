import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { buildTrackName } from '../../util/track-utils';
import Track from '../Common/Track';

class PlaybackStatusModule extends Component {
	
	getUpcomingTracks() {
		let {
			upcomingTracks
		} = this.props;

		return upcomingTracks &&
			upcomingTracks.map( (individualTrack) => (
				<li key={individualTrack.track.id}>
					<Track {...(buildTrackName(individualTrack.track))} />
				</li>
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
					<div className="now-playing content-section">
						<h3>Now Playing</h3>
						<Track {...(buildTrackName(currentPlayingTrack))}/>
					</div>
					<div className="upcoming-tracks content-section">
						<h3>Upcoming Tracks</h3>
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
