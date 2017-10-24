import React from 'react';
import { connect } from 'react-redux';
import Dashboard from './Dashboard';

const mapStateToProps = (state) => ({
	loggedIn: state.loginState.loggedIn
});

export default connect(mapStateToProps)(Dashboard);