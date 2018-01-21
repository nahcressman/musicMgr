import { connect } from 'react-redux';
import AddSongModule from './AddSongModule';
import { doSongRequest  } from '../../actions';

const mapStateToProps = (state) => ({
	managedPlaylistId: state.dashboardState.managedPlaylist.id
});

const mapDispatchToProps = (dispatch) => ({
	doSongRequest: (playlistId, songURI) => dispatch(doSongRequest(playlistId, songURI))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddSongModule)
