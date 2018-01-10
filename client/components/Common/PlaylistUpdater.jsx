import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { receivePlaybackUpdateFromServer } from '../../actions';

class PlaylistUpdater extends Component {
	constructor(props) {
		super(props);
		this.onWebSocketOpen = this.onWebSocketOpen.bind(this);
		this.onWebSocketMessage = this.onWebSocketMessage.bind(this);
		this.serverPingIntervalFunc = this.serverPingIntervalFunc.bind(this);
	}
	componentDidMount() {
		let websocket = new WebSocket('ws://localhost:3000/ws/ping');
		websocket.onopen = this.onWebSocketOpen;
		websocket.onerror = (e) => { console.log('websocket failed to open')};
		websocket.onmessage = this.onWebSocketMessage;
		this.setState({
			ws: websocket
		});
	}

	onWebSocketOpen() {
		console.log('websocket is open');
		let interval = window.setInterval(this.serverPingIntervalFunc, 2000);
		this.setState({
			pingInterval: interval
		});
	}

	onWebSocketMessage(e) {
		if (e.data) {
			this.props.onReceiveStatusUpdate(JSON.parse(e.data));
		}
	}

	componentWillUnmount() {
		if (this.state.ws) {
			this.state.ws.close();
		}
		if(this.state.pingInterval) {
			window.clearInterval(this.state.pingInterval);
		}
	}

	serverPingIntervalFunc() {
		if(this.state.ws) {
			this.state.ws.send(JSON.stringify({
				type: 'STATUS_UPDATE',
				playlist: this.props.managedPlaylist
			}));
		}
	}

	render () {
		return null;
	}
}

PlaylistUpdater.PropTypes = {
	managedPlaylist: PropTypes.object,
	onReceiveStatusUpdate: PropTypes.func
};

const mapDispatchToProps = (dispatch) => ({
	onReceiveStatusUpdate: (updateData) => dispatch(receivePlaybackUpdateFromServer(updateData))
});

export default connect(null, mapDispatchToProps)(PlaylistUpdater);
