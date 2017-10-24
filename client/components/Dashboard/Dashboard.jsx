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
			<div>
				{loggedIn ? (
					<div>
						<Route path="/dashboard" component={PlaylistManagerContainer} />
					</div>
				) : (
					<LoginModule />
				)}
			</div>
		);
	}
}

Dashboard.PropTypes = {
	loggedIn: PropTypes.bool.isRequired
};

export default Dashboard;