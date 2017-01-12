// src/components/App/index.js
import React, { Component } from 'react';
//import classnames from 'classnames';

class LoginModule extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loginURL: "https://accounts.spotify.com/authorize/?client_id=2068662022c74a1697dcc0e4eeacf439&response_type=code&redirect_uri=http://localhost%3A3000%2FloggedIn&scope=user-read-private%20user-read-email&show_dialog=true"
		};
		this.handleLogin = this.handleLogin.bind(this);
	}
	handleLogin () {

	}
	render () {
		return (
			<div>
				<a href={this.state.loginURL}>
				log in
				</a>
			</div>
		);
	}
}

export default LoginModule;