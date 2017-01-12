import React, {Component } from 'react';
import SearchForm from '../SearchForm';
import ResultList from '../ResultList';
import rp from 'request-promise';

class SearchInterface extends Component {
	constructor (props) {
		super(props);
		this.state = {
			trackResults: [],
			albumResults: [],
			artistResults: []
		};
		this.handleQuerySubmit = this.handleQuerySubmit.bind(this);
	}
	handleQuerySubmit (query) {	
		var that = this;
		console.log(`Sending request to ${this.props.url} with these parameters:`);
		console.log(`${query}`);
		rp({
			uri: 'http://localhost:3001' + this.props.url,
			qs: {q: query},
			json: true
		}).then(response => {
			that.setState({
				trackResults: response.tracks,
				albumResults: response.albums,
				artistResults: response.artists
			});
		});
		// $.get(this.props.url, {q: query}, function(data) {
		// 	si.setState({
		// 		trackResults: data.tracks,
		// 		albumResults: data.albums,
		// 		artistResults: data.artists
		// 	});
		// });
	}
	render () {
		return (
			<div>
				<SearchForm onQuerySubmit={this.handleQuerySubmit}/>
				<ResultList type="artists" results={this.state.artistResults}/>
				<ResultList type="tracks" results={this.state.trackResults}/>
				<ResultList type="albums" results={this.state.albumResults}/>
			</div>
		);
	}
}

export default SearchInterface;