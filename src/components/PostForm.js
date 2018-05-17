import React, { Component } from 'react';
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'
import * as API from '../ContentStorageAPI'
import * as Actions from '../actions'

class PostForm extends Component {
  saveNewPost = ( e ) => {
    e.preventDefault();
    const newPost = serializeForm(e.target, {hash: true});
    newPost.voteScore = 1;
    newPost.commentCount = 0;
    newPost.timestamp = Date.now();
    API.saveNewPost(newPost).then(response => {
      // TODO: if (response.error)
      this.props.dispatch(Actions.appendNewPost( newPost ));
      // TODO: give user feedback ("succes!")
    });
  }

  updatePost = ( e ) => {
    e.preventDefault();
    const post = serializeForm(e.target, {hash: true});
    API.updatePost(post).then(response => {
      // TODO: if (response.error)
      // this.props.dispatch(Actions.updatePost( post ));
      // TODO: give user feedback ("succes!")
    });
  }

  render() {
    const isNewPost = this.props.modals.isNewPost;
    const post = this.props.modals.postInEdition;

    return (<div className="post-form">
      <form onSubmit={isNewPost ? this.saveNewPost : this.updatePost}>
        Title:  <input type="text" name="title" value={ isNewPost ? "" : post.title } required/><br/>
        Author: <input type="text" name="author" value={ isNewPost ? "" : post.author } required/><br/>
        Category: <select name="category" required>{
          this.props.categories.map(c =>
            (<option key={c.name} disabled={c.name === 'all'} selected={!isNewPost && c.name === post.category}>{c.name}</option>)
          )}</select><br/><br/>
        Body:   <textarea name="body" value={ isNewPost ? "" : post.body } required/><br/>
        <button type="submit">{isNewPost ? "save post" : "update"}</button>
      </form>
      <div id="form-feedback"></div>
    </div>)

  }
}

function mapStateToProps ({ categories, modals }) {
  return { categories, modals }
}

export default connect(mapStateToProps)(PostForm);
