import React, { Component } from 'react';
import { connect } from 'react-redux'
import FaPencil from 'react-icons/lib/fa/pencil';
import FaPlusCircle from 'react-icons/lib/fa/plus-circle';
import * as Actions from '../actions'

class LoadPostFormButton extends Component {

  toggleModal(formIsOpen, post) {
    if (post)
      this.props.dispatch(Actions.toggleEditPostModal(formIsOpen, post));
    else
      this.props.dispatch(Actions.toggleNewPostModal(formIsOpen))
  }

  render() {
    const { post, isOpen } = this.props;

    let cssClass = "add-post-icon pointer",
          iconTitle = "add new post",
          displayText = <FaPlusCircle/>;

    if (post && post.id !== undefined) {
      cssClass = "post-control-icon pointer";
      iconTitle = "edit post";
      displayText = <FaPencil/>;
    }

    return (<div className={cssClass} title={iconTitle} onClick={() =>
              this.toggleModal(isOpen, post)}>
                {displayText}
            </div> );
  }
}

export default connect()(LoadPostFormButton);
