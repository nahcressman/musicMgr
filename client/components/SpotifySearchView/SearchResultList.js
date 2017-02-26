import React from 'react';

const SearchResultList = ({results, header}) => (
	<div className="resultSet">
		<h3>{header}</h3>
		{results.map(result => 
			<div key={result.id}>{result.name}: {result.popularity}</div> 
		)}
	</div>
)

export default SearchResultList;