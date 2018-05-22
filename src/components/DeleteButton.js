import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as Actions from '../actions'

class DeleteButton extends Component {
  deletePost( id ) {
    this.props.dispatch(Actions.deletePost( id ));
  }

  render() {
    return (<em onClick={() => this.deletePost(this.props.id)}>Delete</em>);
  }
}

export default connect()(DeleteButton);
