import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as API from '../ContentStorageAPI'
import * as Actions from '../actions'

class PostPage extends Component {
  componentDidMount() {}

  render() {
    const id = this.props.location.pathname.split("/").pop();
    const post = this.props.posts.find(p => p.id === id);

    return !post ? (<div>Loading post</div>) : (<div>
        <div>
          <h2>{post.title}</h2>
          <p>{`by ${post.author} on ${post.timestamp}`}</p>
          <p>{`category: ${post.category}`}</p>
          <p>{`scores: ${post.voteScore}`}</p>
          <p>{`${post.commentCount} comments`}</p>
          <div>{post.body}</div>
        </div>
        <div id="comments">
        </div>
      </div>);
  }
}

function mapStateToProps ({ posts }) {
  return { posts }
}

export default connect(mapStateToProps)(PostPage);
