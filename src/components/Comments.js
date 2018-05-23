import React, { Component } from 'react';
import { connect } from 'react-redux'
import FaPencil from 'react-icons/lib/fa/pencil';
import Vote from './Vote'
import DeleteButton from './DeleteButton'
import * as Actions from '../actions'
import { getDate } from '../utils/helpers'

class Comments extends Component {
  edit(e, comment) {
    e.preventDefault();
    this.props.dispatch(Actions.editComment( comment ));
  }

  render() {
    const comments = this.props.comments;

    return !comments ?
      (<div>Loading comments!</div>) :
      (<div id="comments">{
        comments.map(c => (<div className="comment" key={c.id}>
          <div className="comment-content">
            <h4>{c.author} says:</h4>
            <p>{c.body}</p>
            <p>Date: {getDate(c.timestamp)}</p>

            <div className="comment-options">
              <DeleteButton item={c}/>
              <div title="edit" className="control-icon" onClick={e => this.edit(e, c)}>
                <FaPencil/>
              </div>
            </div>
          </div>
          <div className="comment-vote">
            <Vote item={c}/>
          </div>
        </div>))
      }</div>)
  }
};


function mapStateToProps ({ comments }) {
  return { comments }
}

export default connect(mapStateToProps)(Comments);
