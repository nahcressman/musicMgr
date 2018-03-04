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

	componentWillUnmount() {
		this.props.resetSessionSelectionErrors();
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

	getErrorMessage(error) {
		if (error === "SESSION_NOT_ACTIVE") {
			return <div>The host's login has expired. Tell them to login then try again.</div>
		} else {
			return <div>Something went wrong. Reload and try again.</div>
		}
	}

	render() {
		let {
			managedPlaylist,
			isFetching
		} = this.props;

		return (
				<div className="content-section">
					{managedPlaylist &&
						managedPlaylist.error &&
						this.getErrorMessage(managedPlaylist.error)}
					
					<h3>Which session do you want to join?</h3>
					<form className="search-form" onSubmit={this.handleSubmit}>
						<input className="search-input" type="text" value={this.state.inputValue} onChange={this.handleChange} />
						<button className="search-button">
							<span className="fas fa-lg fa-arrow-circle-right" ></span>
						</button>
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
