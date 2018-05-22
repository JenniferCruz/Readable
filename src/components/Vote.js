import React, { Component } from 'react';
import { connect } from 'react-redux'
import FaCaretUp from 'react-icons/lib/fa/caret-up';
import FaCaretDown from 'react-icons/lib/fa/caret-down';
import * as Actions from '../actions'

class Vote extends Component {
  updateVoteScore(e, postID, vote) {
    e.preventDefault();
    this.props.dispatch(Actions.updateVoteScore(postID, vote));
  }

  render() {
    const post = this.props.post;

    return (<div>
        <div>{post.voteScore}</div>
        <div className="post-vote">
          <a href="" title="vote up"
            onClick={(e)=>this.updateVoteScore(e, post.id, 1)}>
              <FaCaretUp/></a>
          <a href="" title="vote down"
            onClick={(e)=>this.updateVoteScore(e, post.id, -1)}>
              <FaCaretDown/></a>
        </div>
      </div>);
  }
}

function mapStateToProps ({ posts }) {
  return { posts }
}

export default connect(mapStateToProps)(Vote);
