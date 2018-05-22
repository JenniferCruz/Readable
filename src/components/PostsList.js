import React, { Component } from 'react';
import { connect } from 'react-redux'
import PostSnippet from './PostSnippet'

class PostsList extends Component {

  render() {
    const { toggleModal, deletePost } = this.props;
    let posts = this.props.posts;
    const cname = this.props.match.params.cname;
    if (cname && cname !== "all")
          posts = posts.filter(p => p.category === cname);

    return (
      <div>
        {
          <ul>{
              posts.map(p =>
                (<li key={p.id}>{
                  <PostSnippet p={p} loadEditForm={toggleModal} deletePost={deletePost}/>
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
