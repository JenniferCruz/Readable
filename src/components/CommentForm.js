import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getCurrentPostID } from '../utils/helpers'
import FaPlusCircle from 'react-icons/lib/fa/plus-circle';
import * as Actions from '../actions'

class CommentForm extends Component {

  state = {
    author: "",
    body: ""
  }

  toggleForm( e, isOpen ) {
    e.preventDefault();
    this.props.dispatch(Actions.toggleCommentForm(isOpen));
  }

  saveComment( e ) {
    e.preventDefault();
    const c = Object.assign({}, this.state);
    c.parentId = getCurrentPostID();
    this.props.dispatch(Actions.saveComment( c ));
  }

  handleChange(e) {
    const c = {};
    c[e.target.name] = e.target.value;
    this.setState(c);
  }

  render() {
    const isClose = !this.props.activeOptions.isOpenCommentForm;
    return isClose ? (
      <div>
        <hr/>
        Add new comment <em onClick={e => this.toggleForm(e, !isClose)}><FaPlusCircle/></em>
        <hr/>
      </div>
    ) :
    (<div>
        <hr/>
        <em onClick={e => this.toggleForm(e, !isClose)}>X</em>

        <form onSubmit={ e => this.saveComment(e) }>

          Username: <input type="text" name="author" value={this.state.author}
                     onChange={ e => this.handleChange(e) } required/><br/>

          Body:     <textarea name="body" value={this.state.body}
                     onChange={ e => this.handleChange(e) } required/><br/>

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
