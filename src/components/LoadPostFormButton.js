import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as Actions from '../actions'

class LoadPostFormButton extends Component {

  toggleModal(formIsOpen, post) {
    if (post)
      this.props.dispatch(Actions.toggleEditPostModal(formIsOpen, post));
    else
      this.props.dispatch(Actions.toggleNewPostModal(formIsOpen))
  }

  render() {
    return (<em onClick={() => this.toggleModal(this.props.isOpen, this.props.post)}>
                {this.props.displayText}
            </em> );
  }
}

export default connect()(LoadPostFormButton);
