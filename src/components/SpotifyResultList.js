import { connect } from 'react-redux';
import ResultList from './ResultList';

const getResultsFromState = (resultSet) => resultSet ? resultSet.items : [];

const mapStateToProps = (state, ownProps) => {
	return {
		results: getResultsFromState(state.spotifySearch[ownProps.type]),
		header: ownProps.type
	}
}

const SpotifyResultList = connect(mapStateToProps)(ResultList);

export default SpotifyResultList;