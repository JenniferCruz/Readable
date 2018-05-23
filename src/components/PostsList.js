import React, { Component } from 'react';
import { connect } from 'react-redux'
import PostSnippet from './PostSnippet'
import * as Actions from '../actions'

class PostsList extends Component {

  orderPosts( e, byCriteria ) {
    e.preventDefault();
    const criteria = byCriteria === "date" ? Actions.ORDER_POSTS_BY_DATE : Actions.ORDER_POSTS_BY_SCORE;
    this.props.dispatch(Actions.orderPosts( criteria ));
  }

  render() {
    let posts = this.props.posts;
    const cname = this.props.match.params.cname;
    if (cname && cname !== "all")
          posts = posts.filter(p => p.category === cname);
    const containsPosts = posts.length > 0;

    return (
      <div className="posts">
        <div className="section-header">
          <h2>{cname && cname !== "all" ? cname + " posts" : "Posts"}</h2>
          {containsPosts && (
            <div className="post-listing-controls">
              <div>
                Sort by <a href="" onClick={e => this.orderPosts(e, "date")}>Date</a> |
                <a href="" onClick={e => this.orderPosts(e, "vote")}>Vote Score</a>
              </div>
            </div>
          )}
        </div>
        {
          !containsPosts && (<p>There are no posts under this category</p>)
        }
        {
          <ul>{
              posts.map(p =>
                (<li key={p.id}>{
                  <PostSnippet p={p} />
                }</li>)
              )
          }</ul>
        }
      </div>
    );
  }
}


function mapStateToProps ({ posts }) {
  return { posts }
}

export default connect(mapStateToProps)(PostsList);
