import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { buildTrackName } from '../../util/track-utils';
import Track from '../Common/Track';
import ExpandableSection from '../Common/ExpandableSection';

class PlaybackStatusModule extends Component {
	
	getUpcomingTracks() {
		let {
			upcomingTracks
		} = this.props;

		return upcomingTracks &&
			upcomingTracks.map( (individualTrack, index) => (
				<li className="track-list-item" key={`result${index}_${individualTrack.track.id}`}>
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
					<ExpandableSection
						title="Now Playing">
						<Track {...(buildTrackName(currentPlayingTrack))}/>
					</ExpandableSection>
					<ExpandableSection
						title="Upcoming Tracks">
						<ul className="track-list upcoming-tracks">
							{this.getUpcomingTracks()}
						</ul>
					</ExpandableSection>
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
