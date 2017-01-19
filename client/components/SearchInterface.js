import React from 'react';
import SearchForm from './SearchForm';
import SpotifyResultList from './SpotifyResultList';
//import constants from './'

const SearchInterface = () => (
	<div>
		<SearchForm />
		<SpotifyResultList type="artist" />
		<SpotifyResultList type="album" />
		<SpotifyResultList type="track" />
	</div>
);

export default SearchInterface;