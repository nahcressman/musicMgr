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
			<label htmlFor="searchBox">Search terms: </label>
			<input id="searchBox" type="text" ref={node => {input = node}} />
			<input type="submit" value="Go"/>
		</form>	
	)
};

SearchForm = connect()(SearchForm);

export default SearchForm;
