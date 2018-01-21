import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchInterface from '../SpotifySearchView/SearchInterface';

class AddSongModule extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isSelectingSong: false
		};
		this.onToggleSearchInterface = this.onToggleSearchInterface.bind(this);
		this.songSelectHandler = this.songSelectHandler.bind(this);
	}
	onToggleSearchInterface(e) {
		this.setState({
			isSelectingSong: true
		});
	}
	songSelectHandler(songURI) {
		if(songURI) {
			this.props.doSongRequest(this.props.managedPlaylistId, songURI);
		}
	}

	render() {
		return (
			<div className="song-selection-container">
				{
					this.state.isSelectingSong ? 
						<SearchInterface 
							showTracks
							songSelectHandler={this.songSelectHandler}
						/> :
						<button onClick={this.onToggleSearchInterface}>Add a song</button>
				}
			</div>
		);
	}
}

AddSongModule.PropTypes = {
	managedPlaylistId: PropTypes.string,
	doSongRequest: PropTypes.func
}

export default AddSongModule;