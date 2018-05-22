import React, { Component } from 'react';
import { connect } from 'react-redux'
import PostSnippet from './PostSnippet'
import * as Actions from '../actions'

class PostsList extends Component {

  orderPosts( e, byCriteria ) {
    const criteria = byCriteria === "date" ? Actions.ORDER_POSTS_BY_DATE : Actions.ORDER_POSTS_BY_SCORE;
    this.props.dispatch(Actions.orderPosts( criteria ));
  }

  render() {
    let posts = this.props.posts;
    const cname = this.props.match.params.cname;
    if (cname && cname !== "all")
          posts = posts.filter(p => p.category === cname);

    return (
      <div>
        <div>
          Order post by <em onClick={e => this.orderPosts(e, "date")}>Date</em>
          | <em onClick={e => this.orderPosts(e, "vote")}>VoteScore</em>
        </div>

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
