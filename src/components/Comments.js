import React, { Component } from 'react';
import { connect } from 'react-redux'
import Vote from './Vote'
import DeleteButton from './DeleteButton'
import * as Actions from '../actions'

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
          <div>
            <h4>{c.author} says:</h4>
            <p>{c.body}</p>
            <em>Date: {new Date(c.timestamp).toDateString()}</em>
            <Vote item={c}/>
            <DeleteButton item={c}/>
            <em onClick={e => this.edit(e, c)}>Edit</em>
          </div>
        </div>))
      }</div>)
  }
};


function mapStateToProps ({ comments }) {
  return { comments }
}

export default connect(mapStateToProps)(Comments);
