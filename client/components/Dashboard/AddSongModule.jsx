import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchInterface from '../SpotifySearchView/SearchInterface';

class AddSongModule extends Component {
	constructor(props) {
		super(props);
		this.songSelectHandler = this.songSelectHandler.bind(this);
	}
	songSelectHandler(songURI) {
		if(songURI) {
			this.props.doSongRequest(this.props.managedPlaylistId, songURI);
		}
	}
	render() {
		return (
			<SearchInterface 
				showTracks
				songSelectHandler={this.songSelectHandler}
			/> 
		);
	}
}

AddSongModule.PropTypes = {
	managedPlaylistId: PropTypes.string,
	doSongRequest: PropTypes.func
}

export default AddSongModule;