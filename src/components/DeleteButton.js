import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as Actions from '../actions'

class DeleteButton extends Component {
  delete( item ) {
    this.props.dispatch(Actions.remove( item ));
  }

  render() {
    return (<em onClick={() => this.delete(this.props.item)}>Delete</em>);
  }
}

export default connect()(DeleteButton);
