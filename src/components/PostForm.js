import React, { Component } from 'react';
import { connect } from 'react-redux'

class PostForm extends Component {
  render() {
    return (<div className="post-form">
      <form>
        Title:  <input type="text" name="title" required/><br/>
        Author: <input type="text" name="author" required/><br/>
        Category: <select name="category" required>{
          this.props.categories.map(c =>
            (<option key={c.name} disabled={c.name === 'all'}>{c.name}</option>)
          )}</select><br/><br/>
        Body:   <textarea name="body" required/><br/>
        <button type="submit">save post</button>
      </form>
    </div>)
  }
}

function mapStateToProps ({ categories }) {
  return { categories }
}

export default connect(mapStateToProps)(PostForm);
