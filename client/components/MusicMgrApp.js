// src/components/MusicMgrApp
import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom';
import DashboardContainer from './Dashboard/DashboardContainer';
import ParticipantViewContainer from './Participant/ParticipantViewContainer';

import Navigation from './Navigation';
import ContentViewContainer from './ContentViewContainer';

const MusicMgrApp = () => {
	return (
		<div className="app-content">
			<header><Link className="nav-link" to="/">Spotify Jukebox</Link></header>
			<Route exact path="/" render={props => (
				<div className="home-nav">
					<div className="nav-section">	
						<button className="nav-link-container"><Link className="nav-link" to="/dashboard">Host a jukebox</Link></button>
					</div>
					<div className="nav-section">
						<button className="nav-link-container"><Link className="nav-link" to="/participant">Join an existing jukebox</Link></button>
					</div>
				</div>
			)} />
			<Route path="/dashboard" component={DashboardContainer} />
			<Route path="/participant" component={ParticipantViewContainer} />
		</div>
	);
};

export default MusicMgrApp;