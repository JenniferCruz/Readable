import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as Actions from '../actions'
import Comments from './Comments'
import DeleteButton from './DeleteButton'
import LoadPostFormButton from './LoadPostFormButton'
import Vote from './Vote'

class PostPage extends Component {
  getPostID() {
    return this.props.location.pathname.split("/").pop();
  }

  componentDidMount() {
    this.props.dispatch(Actions.loadComments(this.getPostID()));
  }

  render() {
    const id = this.getPostID();
    const post = this.props.posts.find(p => id === p.id.toString());
    return !post ?
    (<div>Loading post</div>) : // TODO: Not found page if no post
    (<div>
        <div>
          <h2>{post.title}</h2>
          <p>{`by ${post.author} on ${post.timestamp}`}</p>
          <p>{`category: ${post.category}`}</p>
          <p>{`scores: ${post.voteScore}`}</p>
          <p>{`${post.commentCount} comments`}</p>
          <div>{post.body}</div>
          <LoadPostFormButton isOpen={true} post={post} displayText="Edit"/>
          <DeleteButton id={post.id}/>
          <Vote post={post}/>
        </div>
        <Comments/>
      </div>);
  }
}

function mapStateToProps ({ posts }) {
  return { posts }
}

export default connect(mapStateToProps)(PostPage);
