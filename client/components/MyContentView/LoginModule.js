import React from 'react';
import { connect } from 'react-redux';
import { doSpotifyLogout } from '../../actions.js';

const mapStateToProps = (state, ownProps) => {
	return {
		loggedIn: state.spotifyMyContent.loggedIn
	}
}

const mapDispatchToProps = (dispatch) => ({
  onLogoutClick: () => {
    dispatch(doSpotifyLogout());
  }
});

let LoginModule = ( {loggedIn, onLogoutClick} ) => {
	if(!loggedIn) {
		return (
			<div>
				<a href="https://accounts.spotify.com/authorize/?client_id=2068662022c74a1697dcc0e4eeacf439&response_type=code&redirect_uri=http://localhost:3000/loggedIn&scope=playlist-modify-public%20user-read-private%20user-read-playback-state%20playlist-read-collaborative%20playlist-read-private&show_dialog=true" >
				Click here to login to Spotify and view your playlists.
				</a>
			</div>
		);
	}
	else {
		return (
			<div> 
				Currently logged in to Spotify as ______. 
				<a href="#" onClick={e => {
			     	e.preventDefault()
			     	onLogoutClick()
			   	}}>
					Click here to log out.
				</a>
			</div>
		);
	}
}

LoginModule = connect(mapStateToProps, mapDispatchToProps)(LoginModule);

export default LoginModule;