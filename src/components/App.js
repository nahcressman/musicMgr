// src/components/App/index.js
import React, { Component } from 'react';
//import classnames from 'classnames';
import LoginModule from './LoginModule';
import SearchInterface from './SearchInterface';

import '../css/App.css';

const App = ({children}) => {
	console.log("inside App, children is" + JSON.stringify({children}));

	return (
		<div>
			<LoginModule/>
			<SearchInterface/>
			{children}
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