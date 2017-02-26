import React from 'react';
import MyContentView from './MyContentView/MyContentView';
import SpotifySearchView from './SpotifySearchView/SpotifySearchView';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => ({
  activePane: state.navigationState
});

let ContentViewContainer = ( {activePane} ) => {
	switch (activePane) {
		case 'SPOTIFY_SEARCH':
			return ( <SpotifySearchView/> );
		case 'MY_CONTENT':
			return ( <MyContentView/> );
		default:
			return ( <SpotifySearchView/> );
	}
};

ContentViewContainer = connect(mapStateToProps)(ContentViewContainer);

export default ContentViewContainer;