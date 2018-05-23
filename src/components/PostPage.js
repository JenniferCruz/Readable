import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as Actions from '../actions'
import { getCurrentPostID, getDate } from '../utils/helpers'
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
    (<div className="post-page">Loading post</div>) : // TODO: Not found page if no post
    (<div className="post-page">
        <div>
          <div className="section-header">
            <div className="post-page-title">
              <h2>{post.title}</h2>
            </div>
            <div className="post-controls">
              <LoadPostFormButton isOpen={true} post={post} />
              <DeleteButton item={post} cssClass="post-control-icon"/>
            </div>

          </div>

          <div className="post-page-aside">
            <div className="post-page-info">
              <p>{`By: ${post.author}`}</p>
              <p>{`Date: ${getDate(post.timestamp)}`}</p>
              <p>{`Category: ${post.category}`}</p>
              <p>{`${post.commentCount} comments`}</p>
            </div>
            <div className="post-page-score">
              <Vote item={post}/>
            </div>
          </div>

          <div className="section-content">
            {post.body}
          </div>
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
