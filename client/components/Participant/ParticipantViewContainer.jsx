import React from 'react';
import { connect } from 'react-redux';
import ParticipantView from './ParticipantView';
import { doFetchManagedPlaylist, doCreateManagedPlaylist } from '../../actions';

const mapDispatchToProps = (dispatch) => ({
	fetchManagedPlaylist: () => dispatch(doFetchManagedPlaylist()),
	createManagedPlaylist: () => dispatch(doCreateManagedPlaylist())
});

const mapStateToProps = (state) => ({
	managedPlaylist: state.dashboardState.managedPlaylist
});

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantView);