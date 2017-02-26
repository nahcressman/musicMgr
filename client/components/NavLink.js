import React from 'react';
import Link from './Common/Link';
import { setNavigationState, fetchPaneData } from '../actions';
import { connect } from 'react-redux';

const mapStateToProps = (state, ownProps) => ({
  active: ownProps.destination === state.navigationState
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    dispatch(setNavigationState(ownProps.destination));
    dispatch(fetchPaneData(ownProps.destination));
  }
})

const NavLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)

export default NavLink;