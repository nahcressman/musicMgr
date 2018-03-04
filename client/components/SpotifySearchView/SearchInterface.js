import React, {Component} from 'react';
import SearchForm from './SearchForm';
import PropTypes from 'prop-types';
import SearchResultListContainer from './SearchResultListContainer';

class SearchInterface extends Component {
	
	render() {
		const {
			showArtists,
			showAlbums,
			showTracks,
			songSelectHandler
		} = this.props;
		
		return (
			<div>
				<SearchForm />
				{showTracks &&
					<SearchResultListContainer
						type="track"
						songSelectHandler={songSelectHandler}/>}
			</div>
		);
	}
}

SearchInterface.defaultProps = {
	showArtists: false,
	showAlbums: false,
	showTracks: false,
	songSelectHandler: () => {}
};

SearchInterface.PropTypes = {
	showArtists: PropTypes.bool,
	showAlbums: PropTypes.bool,
	showTracks: PropTypes.bool,
	songSelectHandler: PropTypes.func
};

export default SearchInterface;