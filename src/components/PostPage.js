import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as Actions from '../actions'
import { getCurrentPostID } from '../utils/helpers'
import Comments from './Comments'
import DeleteButton from './DeleteButton'
import LoadPostFormButton from './LoadPostFormButton'
import Vote from './Vote'
import CommentForm from './CommentForm';

class PostPage extends Component {

  componentDidMount() {
    this.props.dispatch(Actions.loadComments(getCurrentPostID()));
  }

  render() {
    const id = getCurrentPostID();
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
          <DeleteButton item={post}/>
          <Vote item={post}/>
        </div>
        <CommentForm/>
        <Comments/>
      </div>);
  }
}

function mapStateToProps ({ posts }) {
  return { posts }
}

export default connect(mapStateToProps)(PostPage);
