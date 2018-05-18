import React, { Component } from 'react';
import { connect } from 'react-redux'
import serializeForm from 'form-serialize'
import * as API from '../ContentStorageAPI'
import * as Actions from '../actions'

class PostForm extends Component {

  handleChange = ( e, post ) => {
    const p = Object.assign({}, post);
    p[e.target.name] = e.target.value;
    this.props.dispatch(Actions.updatePostInEdition( p ));
  }

  savePost = ( e, post ) => {
    e.preventDefault();
    const p = post.id ? post : serializeForm(e.target, {hash: true});
    this.props.dispatch(Actions.savePost( p ));
  }

  render() {
    const post = this.props.activeOptions.postInEdition || {};
    const isNewPost = post.id === undefined;

    return (<div className="post-form">
      <form onSubmit={ e => this.savePost(e, post) }>

        Title: <input type="text" name="title" value={ post.title }
                  onChange={ e => this.handleChange(e, post) } required/><br/>
        Author: <input type="text" name="author" value={ post.author } disabled={!isNewPost}
                  onChange={ e => this.handleChange(e, post) } required/><br/>
        Category: <select name="category" disabled={!isNewPost} value={post.category}
                    onChange={ e => this.handleChange(e, post) } required>{
                      this.props.categories.map(c =>
                        (<option key={c.name} disabled={!isNewPost}>
                              {c.name}
                        </option>)
                  )}</select><br/><br/>
        Body: <textarea name="body" value={ post.body }
                onChange={ e => this.handleChange(e, post) } required/><br/>

        <button type="submit"> {isNewPost ? "save post" : "update"} </button>

      </form>
      <div id="form-feedback"></div>
    </div>)
  }
}

function mapStateToProps ({ categories, activeOptions }) {
  return { categories, activeOptions }
}

export default connect(mapStateToProps)(PostForm);
