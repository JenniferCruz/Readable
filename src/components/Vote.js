import React, { Component } from 'react';
import { connect } from 'react-redux'
import FaCaretUp from 'react-icons/lib/fa/caret-up';
import FaCaretDown from 'react-icons/lib/fa/caret-down';
import * as Actions from '../actions'

class Vote extends Component {
  updateVoteScore(e, item, vote) {
    e.preventDefault();
    this.props.dispatch(Actions.updateVoteScore(item, vote));
  }

  render() {
    const item = this.props.item;

    return (<div className="score">
        <div>{item.voteScore}</div>
        <div>
          <a href="" title="vote up"
            onClick={(e)=>this.updateVoteScore(e, item, 1)}>
              <FaCaretUp/></a>
          <a href="" title="vote down"
            onClick={(e)=>this.updateVoteScore(e, item, -1)}>
              <FaCaretDown/></a>
        </div>
      </div>);
  }
}

function mapStateToProps ({ posts, comments }) {
  return { posts, comments }
}

export default connect(mapStateToProps)(Vote);
