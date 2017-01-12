import React, { Component } from 'react';

class ResultList extends Component {
	render () {
		var resultSet = this.props.results.map(function (result) {
			return (
				<div>{result.name}: {result.popularity}</div>
			);
		});
		return (
			<div className="resultSet">
				<h3>{this.props.type}</h3>
				{resultSet}
			</div>
		);
	}
};

export default ResultList;