import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PlaylistManager extends Component {
	
	componentDidMount() {
		this.props.fetchContentOnMount();
	}

	getPlaylists() {
		if (this.props.playlists) {
			return this.props.playlists.map( (playlist) => (
				<li onClick={(e) => this.props.onSelectPlaylist(playlist.id)} key={playlist.id}>
					<span>{playlist.name} - {playlist.numTracks} track{playlist.numTracks > 1 ? 's' : ''}</span>
				</li>
			));
		} 
		return (
			<div>No playlists to show. Create a new one</div>
		);
	}

	render() {
		let {
			isFetching
		} = this.props;

		return isFetching ? (
			<span>Fetching</span>
		) : (
			<ul>
				{this.getPlaylists()}
			</ul>
		);
	}
}

PlaylistManager.PropTypes = {
	isLoading: PropTypes.bool,
	playlists: PropTypes.arrayOf(PropTypes.object),
	fetchContentOnMount: PropTypes.func,
	onSelectPlaylist: PropTypes.func
};

export default PlaylistManager;