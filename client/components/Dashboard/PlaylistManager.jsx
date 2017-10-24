import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoginModule from '../MyContentView/LoginModule';
import { Link } from 'react-router-dom';
import PlaybackStatusModule from './PlaybackStatusModule';

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
							<p>Currently using playlist named {managedPlaylist.spotifyPlaylistDetails.name}.</p>
							<PlaybackStatusModule />
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