import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {buildTrackName} from '../../util/track-utils';
import Track from '../Common/Track';

class SearchResultList extends Component {

	constructor(props) {
		super(props);
		this.generateOnClickHandler = this.generateOnClickHandler.bind(this);
	}

	generateOnClickHandler(result) {
		return (event) => {this.props.songSelectHandler(result.uri)};
	}

	render() {
		const {
			results,
			header,
			songSelectHandler
		} = this.props;
		return (
			<div className="resultSet">
				<h3>{header}</h3>
				{results.map(result => 
					<div key={result.id} onClick={this.generateOnClickHandler(result)}>
						<Track {...(buildTrackName(result))} />
					</div>
				)}
			</div>	
		);
	}
}

SearchResultList.PropTypes = {
	results: PropTypes.arrayOf(PropTypes.object),
	header: PropTypes.string,
	songSelectHandler: PropTypes.func
};

export default SearchResultList;