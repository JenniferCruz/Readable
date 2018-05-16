import React, { Component } from 'react';
import { connect } from 'react-redux'
import logo from './logo.svg';
import './App.css';
import PostSnippet from './components/PostSnippet'
import * as API from './ContentStorageAPI'
import * as Actions from './actions'

class App extends Component {

  componentDidMount() {
    API.getPosts().then(
       posts =>
         this.props.dispatch(Actions.loadPosts(posts))
       );
    API.getCategories().then(
      ({ categories }) =>
         this.props.dispatch(Actions.loadCategories(categories))
      );

  }

  render() {
    const { posts, categories } = this.props;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>
          Categories
        </div>
        <hr/>
        <div>
          {
            <ul>{
                posts.map(p =>
                  (<li key={p.id}>{
                    <PostSnippet p={p}/>
                  }</li>)
                )
            }</ul>
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps ({ posts, categories }) {
  return { posts, categories }
}

export default connect(mapStateToProps)(App);
