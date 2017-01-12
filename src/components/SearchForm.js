import React from 'react';
import { doSpotifySearch } from '../actions';
import { connect } from 'react-redux';

let SearchForm = ( {dispatch} ) => { 
	let input;

	return (
		<form className="SearchForm" onSubmit={e => {
			e.preventDefault()
			if(!input.value.trim()) {
				return
			}
			dispatch(doSpotifySearch('artist', input.value));
			dispatch(doSpotifySearch('track', input.value));
			dispatch(doSpotifySearch('album', input.value));
			input.value = '';
		}}>
			<label htmlFor="searchBox">Search: </label>
			<input id="searchBox" type="text" ref={node => {input = node}} />
			<input type="submit" value="Go"/>
		</form>	
	)
};

SearchForm = connect()(SearchForm);

export default SearchForm;

// class SearchForm extends Component {
// 	constructor (props) {
// 		super(props);
// 		this.state = {queryText: ""};
// 		this.handleSearchBoxChange = this.handleSearchBoxChange.bind(this);
// 		this.handleSubmit = this.handleSubmit.bind(this);
// 	}
// 	handleSearchBoxChange (e) {
// 		this.setState({queryText: e.target.value});
// 	}
// 	handleSubmit (e) {
// 		e.preventDefault();
// 		var queryText = this.state.queryText.trim();
// 		if(!queryText) {
// 			return;
// 		}
// 		this.props.onQuerySubmit(queryText);
// 	}
// 	render () {
// 		return (	
// 			<form className="SearchForm" onSubmit={this.handleSubmit}>				
// 				<label htmlFor="searchBox">Search: </label>
// 				<input id="searchBox" type="text" onChange={this.handleSearchBoxChange} value={this.state.queryText}/>
// 				<input type="submit" value="Go"/>
// 			</form>
// 		);
// 	}
// }

// export default SearchForm;