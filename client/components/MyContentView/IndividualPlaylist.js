import React from 'react';
import classNames from 'classnames'
import PlaylistDetailContainer from './PlaylistDetailContainer';

const IndividualPlaylist = ( {playlistObject, isActive, onPlaylistClick} ) => (
	<li className={ classNames("playlist-container", {active: isActive}) } onClick={onPlaylistClick}> 
		<div>{playlistObject.name}: {playlistObject.numTracks} tracks</div>
		{ isActive ? ( <PlaylistDetailContainer />) : "" }
	</li> 
);

export default IndividualPlaylist;