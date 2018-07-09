import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoginModule from '../MyContentView/LoginModule';
import { Link, Route } from 'react-router-dom';
import PlaybackStatusModule from './PlaybackStatusModule';
import PlaylistUpdater from '../Common/PlaylistUpdater';
import AddSongModuleContainer from './AddSongModuleContainer';
import ExpandableSection from '../Common/ExpandableSection';
import PlaylistPickerContainer from './PlaylistPickerContainer';

class PlaylistManager extends Component {
	componentDidMount() {
		let {
			managedPlaylist,
			fetchManagedPlaylist
		} = this.props;
		if (!managedPlaylist) {
			fetchManagedPlaylist();
		}
	}

	getIsPlayingStatus() {
		return this.props.managedPlaylist &&
			this.props.managedPlaylist.playbackDetails &&
			this.props.managedPlaylist.playbackDetails.is_playing;
	}

	getUpcomingTracks() {
		return this.props.managedPlaylist &&
			this.props.managedPlaylist.upcomingTracks;
	}

	getCurrentPlayingTrack() {
		return this.props.managedPlaylist &&
			this.props.managedPlaylist.playbackDetails &&
			this.props.managedPlaylist.playbackDetails.item
	}

	render() {
		let {
			managedPlaylist,
			isFetching,
			createManagedPlaylist,
			match
		} = this.props;

		return (
				isFetching ? (
					<div>Fetching content, please wait</div> 
				) : (
					managedPlaylist ? (
						<div>
							<PlaylistUpdater
								managedPlaylist={managedPlaylist}
							/>
							<div className="playlist-details content-section">
								<div>Playlist Owner: {managedPlaylist.spotifyPlaylistDetails.owner.display_name}</div>
								<div>Playlist id: {managedPlaylist.id.slice(-4).toUpperCase()}</div>
								<div className="switch-session-button">Leave Session</div>
							</div>

							<PlaybackStatusModule 
								isPlaying={this.getIsPlayingStatus()}
								upcomingTracks={this.getUpcomingTracks()}
								currentPlayingTrack={this.getCurrentPlayingTrack()}
							/>
							<ExpandableSection 
								title="Search">
								<AddSongModuleContainer />
							</ExpandableSection>
						</div>
					) : (
						<div>
							<p>Could not find a playlist being managed by this app.</p>
							<button className="nav-link-container"><Link className="nav-link" to="/host/choose">Choose from your playlists</Link></button>
						</div>
					)
				)
		);
	}
}

PlaylistManager.PropTypes = {
	managedPlaylist: PropTypes.object,
	isFetching: PropTypes.bool,
	fetchDashboardContent: PropTypes.func
};

export default PlaylistManager;