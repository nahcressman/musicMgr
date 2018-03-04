import React, {Component} from 'react';
import { doSpotifySearch } from '../../actions';
import { connect } from 'react-redux';

class SearchForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchTerm: ""
		};
		this.onInputChange = this.onInputChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onInputChange(e) {
		this.setState({
			searchTerm: e.target.value
		});
	}

	onSubmit(e) {
		e.preventDefault();
		if(!this.state.searchTerm.trim()) {
			return;
		}
		this.props.onSubmit(this.state.searchTerm);
	}

	render () {
		return (
			<form className="search-form">
				<input id="searchBox" 
					className="search-input"
					type="text" 
					ref={node => this.textInput = node}
					onChange = {this.onInputChange}
					placeholder="Enter song title or artist name..."/>
				<button className="search-button" onClick={this.onSubmit}>
					<span className="fas fa-lg fa-search" ></span>
				</button>
			</form>	
		);
	}
};

const mapDispatchToProps = (dispatch) => ({
	onSubmit: (input) => dispatch(doSpotifySearch('track', input))
});

SearchForm = connect(null, mapDispatchToProps)(SearchForm);

export default SearchForm;
