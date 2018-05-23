import React, { Component } from 'react';
import { connect } from 'react-redux'
import FaTrash from 'react-icons/lib/fa/trash';
import * as Actions from '../actions'

class DeleteButton extends Component {
  delete( item ) {
    this.props.dispatch(Actions.remove( item ));
  }

  render() {
    const cssClass = this.props.cssClass ? this.props.cssClass + " pointer" : "pointer";
    return (<div className={cssClass} title="delete"
              onClick={() => this.delete(this.props.item)}>
               <FaTrash />
            </div>);
  }
}

export default connect()(DeleteButton);
