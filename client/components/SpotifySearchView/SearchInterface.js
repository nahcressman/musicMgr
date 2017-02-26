import React from 'react';
import SearchForm from './SearchForm';
import SpotifyResultList from './SearchResultListContainer';

const SearchInterface = () => (
	<div>
		<SearchForm />
		<SearchResultListContainer type="artist" />
		<SearchResultListContainer type="album" />
		<SearchResultListContainer type="track" />
	</div>
);

export default SearchInterface;