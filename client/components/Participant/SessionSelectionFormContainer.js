import React from 'react';
import { connect } from 'react-redux';
import SessionSelectionForm from './SessionSelectionForm';
import {doFetchManagedPlaylist, 
		doCreateManagedPlaylist,
		resetSessionSelectionErrors} from '../../actions';

const mapDispatchToProps = (dispatch) => ({
	fetchManagedPlaylist: (id) => dispatch(doFetchManagedPlaylist(id)),
	createManagedPlaylist: () => dispatch(doCreateManagedPlaylist()),
	resetSessionSelectionErrors: () => dispatch(resetSessionSelectionErrors())
});

const mapStateToProps = (state) => ({
	managedPlaylist: state.dashboardState.managedPlaylist,
	isFetching: state.dashboardState.isFetching
});

export default connect(mapStateToProps, mapDispatchToProps)(SessionSelectionForm);