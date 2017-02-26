import React from 'react';
import { connect } from 'react-redux';
import { toggleGenreExpand } from '../../actions';

const getPlaylistGenresFromState = ( state, expanded ) => {
	if (state) {
		return expanded ? state.items : state.items.slice(0,5);
	}
	else {
		return [];
	}
}
const getPlaylistNameFromState = ( state ) => state ? state.playlistName : null;
const getTotalArtistsFromState = ( state ) => state ? state.totalArtists : null;

const mapStateToProps = (state, ownProps) => {
	var genreState = state.playlistGenres;
	return {
		activePlaylistId: genreState.activePlaylistId,
		isFetching: genreState.isFetching,
		playlistGenres: getPlaylistGenresFromState(
			genreState[genreState.activePlaylistId], 
			genreState.expanded),
		playlistName: getPlaylistNameFromState(genreState[genreState.activePlaylistId]),
		playlistTotalArtists: getTotalArtistsFromState(genreState[genreState.activePlaylistId]),
		expanded: genreState.expanded
	};
};

const mapDispatchToProps = (dispatch) => ({
	onGenreExpandClick: (e) => {
		dispatch(toggleGenreExpand());
	}
});

let PlaylistGenreContainer = ( { activePlaylistId, isFetching, playlistGenres, playlistName, expanded, onGenreExpandClick, playlistTotalArtists } ) => {
	if(isFetching) {
		return (
			<h3>Fetching Playist Details...</h3>
		)
	}
	else if (playlistGenres) {
		return (
			<div>
				<h4>Genres</h4>
				<ul>
					{ 
						playlistGenres.map( (genreObject) => {
							var genrePercentage = (genreObject.artistDetails.length / playlistTotalArtists * 100).toFixed(1);
							return ( <li key={genreObject.genre}> { genreObject.genre }: {genrePercentage} % </li>);
						}) 
					}				
				</ul>
				<div className="expander" onClick={ (e) => {
					e.stopPropagation();
					onGenreExpandClick(e); 
				}}> 
					SHOW {expanded ? "LESS" : "MORE"}	
				</div>
			</div>

		);
	}
	else {
		return (
			<h3>No playlist selected</h3>
		);
	}
}

PlaylistGenreContainer = connect(mapStateToProps, mapDispatchToProps)(PlaylistGenreContainer);

export default PlaylistGenreContainer;