import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ExpandableSection extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			expanded: false
		}
		this.onExpandClick = this.onExpandClick.bind(this);
	}

	onExpandClick() {
		this.setState({
			expanded: !this.state.expanded
		});
	}

	render() {
		const {
			expanded
		} = this.state;
		return (
			<div className="expandable-section content-section">
				<div className="expandable-header">
					<h2 className="expandable-title">{this.props.title}</h2>
					<button 
						className="expand-button"
						onClick={this.onExpandClick}>
						<i className={`fas fa-lg ${expanded ? 'fa-angle-up' : 'fa-angle-down'}`}> </i>
					</button>
				</div>
				{this.state.expanded &&
					<div className="expandable-content">
							{this.props.children}
					</div>
				}
			</div>
		);
	}
}

ExpandableSection.PropTypes = {
	title: PropTypes.string
};

export default ExpandableSection;