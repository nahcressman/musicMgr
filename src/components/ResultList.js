import React from 'react';

const ResultList = ({results, header}) => (
	<div className="resultSet">
		<h3>{header}</h3>
		{results.map(result => 
			<div key={result.id}>{result.name}: {result.popularity}</div> 
		)}
	</div>
)

// class ResultList extends Component {
// 	render () {
// 		var resultSet = this.props.results.map(function (result) {
// 			return (
// 				<div>{result.name}: {result.popularity}</div>
// 			);
// 		});
// 		return (
// 			<div className="resultSet">
// 				<h3>{this.props.type}</h3>
// 				{resultSet}
// 			</div>
// 		);
// 	}
//};

export default ResultList;