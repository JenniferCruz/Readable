import React, { Component } from 'react';
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'
import { getCurrentPostID } from '../utils/helpers'
import FaCaretRight from 'react-icons/lib/fa/caret-right';
import FaClose from 'react-icons/lib/fa/close';
import * as Actions from '../actions'

class CommentForm extends Component {

  toggleForm( e, isOpen ) {
    e.preventDefault();
    this.props.dispatch(Actions.toggleCommentForm(isOpen));
  }

  saveComment( e, comment ) {
    e.preventDefault();
    const c = comment.id ? comment : serializeForm(e.target, {hash: true});
    if (!c.parentId)
      c.parentId = getCurrentPostID();
    this.props.dispatch(Actions.saveComment( c ));
  }

  handleChange(e, comment) {
    const c = Object.assign({}, comment);
    c[e.target.name] = e.target.value;
    this.props.dispatch(Actions.updateCommentInEdition( c ));
  }

  render() {
    const isClose = !this.props.activeOptions.isOpenCommentForm;
    const c = this.props.activeOptions.commentInEdition || {};
    const isNew = c.id === undefined;

    return isClose ? (
      <div>
        <hr/>
        Leave a reply
        <em className="add-comment-icon" onClick={e => this.toggleForm(e, !isClose)}>
          <FaCaretRight className="pointer"/>
        </em>
        <hr/>
      </div>
    ) :
    (<div>
        <hr/>
        <h4 className="comments-form-title">{isNew ? "Add a new comment" : "Edit comment"}</h4>
        <div title="close" className="close-icon"
          onClick={e => this.toggleForm(e, !isClose)}>
            <FaClose className="pointer"/>
        </div>

        <form onSubmit={ e => this.saveComment(e, c) }>

          Username: <input type="text" name="author" value={c.author} disabled={!isNew}
                     onChange={ e => this.handleChange(e, c) } required/><br/>

          Body:     <textarea name="body" value={c.body}
                     onChange={ e => this.handleChange(e, c) } required/><br/>

          <button type="submit">"save comment"</button>

        </form>
        <hr/>
      </div>)
  }
}


function mapStateToProps ({ activeOptions }) {
  return { activeOptions }
}

export default connect(mapStateToProps)(CommentForm);
