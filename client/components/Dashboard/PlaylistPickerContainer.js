import React from 'react';
import { connect } from 'react-redux';
import PlaylistPicker from './PlaylistPicker';
import { 
	doSpotifyMyContent,
	beginSetActiveJukeboxPlaylist
} from '../../actions';

const mapDispatchToProps = (dispatch) => ({
	fetchContentOnMount: () => dispatch(doSpotifyMyContent('playlists')),
	onSelectPlaylist: (playlistId) => dispatch(beginSetActiveJukeboxPlaylist(playlistId))
});

const mapStateToProps = (state) => ({
	isFetching: state.spotifyMyContent.playlists ? state.spotifyMyContent.playlists.isFetching : true,
	playlists: state.spotifyMyContent.playlists ? state.spotifyMyContent.playlists.items : undefined
});

const PlaylistPickerContainer = connect(mapStateToProps, mapDispatchToProps)(PlaylistPicker);

export default PlaylistPickerContainer;