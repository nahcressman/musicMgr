import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Track extends Component {

	render() {
		const {
			track,
			artist
		} = this.props;
		return (
			<div className="track-container">
				<div className="track-name">{track}</div>
				<div className="artist-name">{artist}</div>
			</div>
		);
	}
}

Track.PropTypes = {
	track: PropTypes.string,
	artist: PropTypes.string
};

export default Track;