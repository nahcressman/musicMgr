import React from 'react';
import LoginModule from './LoginModule';
import MyContentContainer from './MyContentContainer';

import { connect } from 'react-redux';

const getResultsFromState = (resultSet) => resultSet ? resultSet.items : [];

const mapStateToProps = (state, ownProps) => {
	return {
		loading: state.spotifyMyContent['playlists'].isFetching
	};
}

let MyContentView = ( {loading} ) => {
	if(!loading) {
		return (
			<div>
				<LoginModule />
				<MyContentContainer />
			</div>
		);
	}
	else {
		return (
			<span>Fetching content...</span>
		);
	}
}

MyContentView = connect(mapStateToProps)(MyContentView);

export default MyContentView;