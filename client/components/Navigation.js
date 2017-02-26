import React from 'react';
import NavLink from './NavLink'
import { doSpotifySearch } from '../actions';
import { connect } from 'react-redux';

const Navigation = () => (
	<div>
		<NavLink destination="SPOTIFY_SEARCH"> Search </NavLink>
		<NavLink destination="MY_CONTENT"> My Content </NavLink>
	</div>	
)

export default Navigation;