import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoginModule from '../MyContentView/LoginModule';
import { Route } from 'react-router-dom';
import PlaylistManagerContainer from './PlaylistManagerContainer';
import PlaylistPickerContainer from './PlaylistPickerContainer';

class Dashboard extends Component {
	render() {
		let {
			loggedIn
		} = this.props;
		return (
			loggedIn ? (
				<div className="dashboard">
					<Route 
						exact
						path="/host"
						component={PlaylistManagerContainer}
					/>
					<Route
						path="/host/choose"
						component={PlaylistPickerContainer}
					/>
				</div>
			) : (
				<LoginModule />
			)
		);
	}
}

Dashboard.PropTypes = {
	loggedIn: PropTypes.bool.isRequired
};

export default Dashboard;