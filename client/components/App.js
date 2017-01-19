// src/components/App/index.js
import React, { Component } from 'react';
//import classnames from 'classnames';
import LoginModule from './LoginModule';
import SearchInterface from './SearchInterface';

const App = ({location}) => {
	console.log("inside App, location is" + JSON.stringify({location}));

	return (
		<div>
			<LoginModule/>
			<SearchInterface/>
		</div>
	)
}

// class App extends Component {
// 	render() {
//         return (
// 	    	<div>
// 				<LoginModule/>
// 	            <SearchInterface url="/search"/>
// 	        </div>
//         );
// 	}
// }
export default App;