import React from 'react';
import IndividualPlaylistContainer from './IndividualPlaylistContainer'

const PlaylistList = ( {playlists, activePlaylistId} ) => (
	<div className="playlistSet">
		<h3>Playlists</h3>
		<ul className="playlist-list">
			{playlists.map(result => (
				<IndividualPlaylistContainer key={result.id} playlistObject={result} active={activePlaylistId == result.id}/>
			))}
		</ul>
	</div>
)

export default PlaylistList;