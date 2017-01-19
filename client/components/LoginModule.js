import React, { Component } from 'react';

const LoginModule = () => (
	<div>
		<a href="https://accounts.spotify.com/authorize/?client_id=2068662022c74a1697dcc0e4eeacf439&response_type=code&redirect_uri=http://localhost:3000/loggedIn&scope=user-read-private%20user-read-email&show_dialog=true" >
		log in
		</a>
	</div>
)

export default LoginModule;