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

  render() {
    return (<div className="post-form">
      <form onSubmit={this.saveNewPost}>
        Title:  <input type="text" name="title" required/><br/>
        Author: <input type="text" name="author" required/><br/>
        Category: <select name="category" required>{
          this.props.categories.map(c =>
            (<option key={c.name} disabled={c.name === 'all'}>{c.name}</option>)
          )}</select><br/><br/>
        Body:   <textarea name="body" required/><br/>
        <button type="submit">save post</button>
      </form>
      <div id="form-feedback"></div>
    </div>)
  }
}

function mapStateToProps ({ categories }) {
  return { categories }
}

export default connect(mapStateToProps)(PostForm);
