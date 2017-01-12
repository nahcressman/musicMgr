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

// class SearchInterface extends Component {
// 	constructor (props) {
// 		super(props);
// 		this.state = {
// 			trackResults: [],
// 			albumResults: [],
// 			artistResults: []
// 		};
// 		this.handleQuerySubmit = this.handleQuerySubmit.bind(this);
// 	}
// 	handleQuerySubmit (query) {	
// 		var that = this;
// 		console.log(`Sending request to ${searchUrl} with these parameters:`);
// 		console.log(`${query}`);
// 		rp({
// 			uri: searchUrl,
// 			qs: {q: query},
// 			json: true
// 		}).then(response => {
// 			that.setState({
// 				trackResults: response.tracks,
// 				albumResults: response.albums,
// 				artistResults: response.artists
// 			});
// 		});
// 	}
// 	render () {
// 		return (
// 			<div>
// 				<SearchForm onQuerySubmit={this.handleQuerySubmit}/>
// 				<ResultList type="artists" />
// 				<ResultList type="tracks" />
// 				<ResultList type="albums" />
// 			</div>
// 		);
// 	}
// }

export default SearchInterface;