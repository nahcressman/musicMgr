import React from 'react';
import SearchForm from './SearchForm';
import SearchResultListContainer from './SearchResultListContainer';
import '../../styles/sassStyles.scss';

const SpotifySearchView = () => (
	<div>
		<SearchForm />
		<SearchResultListContainer type="artist" />
		<SearchResultListContainer type="album" />
		<SearchResultListContainer type="track" />
	</div>
);

export default SpotifySearchView;