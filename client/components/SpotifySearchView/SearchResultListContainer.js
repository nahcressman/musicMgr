import { connect } from 'react-redux';
import SearchResultList from './SearchResultList';
import { submitSongRequest, completeSongRequest } from '../../actions';

const getResultsFromState = (resultSet) => resultSet ? resultSet.items : [];

const mapStateToProps = (state, ownProps) => {
	return {
		results: getResultsFromState(state.spotifySearch[ownProps.type]),
		header: ownProps.type
	}
}

const SearchResultListContainer = connect(mapStateToProps)(SearchResultList);

export default SearchResultListContainer;