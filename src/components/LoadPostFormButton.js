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
    const { post, isOpen, displayText } = this.props;
    const cssClass = this.props.cssClass ? this.props.cssClass + " pointer" : "pointer"; 

    return (<div className={cssClass} title="add a new post" onClick={() =>
              this.toggleModal(isOpen, post)}>
                {displayText}
            </div> );
  }
}

export default connect()(LoadPostFormButton);
