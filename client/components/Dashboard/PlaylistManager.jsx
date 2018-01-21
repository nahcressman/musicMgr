import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoginModule from '../MyContentView/LoginModule';
import { Link } from 'react-router-dom';
import PlaybackStatusModule from './PlaybackStatusModule';
import PlaylistUpdater from '../Common/PlaylistUpdater';
import AddSongModuleContainer from './AddSongModuleContainer';

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
			this.props.managedPlaylist.playbackDetails.item.name
	}

	render() {
		let {
			managedPlaylist,
			isFetching,
			createManagedPlaylist
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
							<p>
								Currently using playlist named {managedPlaylist.spotifyPlaylistDetails.name}.
								Playlist id: {managedPlaylist.id.slice(0,4).toUpperCase()}
							</p>

							<PlaybackStatusModule 
								isPlaying={this.getIsPlayingStatus()}
								upcomingTracks={this.getUpcomingTracks()}
								currentPlayingTrack={this.getCurrentPlayingTrack()}
							/>

							<AddSongModuleContainer />
						</div>
					) : (
						<div>
							<p>Could not find a playlist being managed by this app.</p>
							<button onClick={createManagedPlaylist}>Click here to create one</button>	
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