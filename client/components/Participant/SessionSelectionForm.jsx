import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SessionSelectionForm extends Component {

	constructor(props) {
		super(props);
		this.state = {
			inputValue: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		if (e.target.value.length <= 4) {
			this.setState({
				inputValue: e.target.value.toUpperCase()
			});
		}
	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.fetchManagedPlaylist(this.state.inputValue);
	}

	render() {
		let {
			managedPlaylist,
			isFetching
		} = this.props;

		return (
			<div>
				Enter the session code of the jukebox you want to join
				<form onSubmit={this.handleSubmit}>
					<input type="text" value={this.state.inputValue} onChange={this.handleChange} />
					<input type="submit" value="Join" />
				</form>
				{isFetching &&
					<div>Searching For Playlist</div>
				}
			</div>
		);
	}
}

SessionSelectionForm.PropTypes = {
	fetchManagedPlaylist: PropTypes.func,
	managedPlaylist: PropTypes.func,
	isFetching: PropTypes.bool
};

export default SessionSelectionForm;
