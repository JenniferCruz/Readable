import React, { Component } from 'react';
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
import logo from './logo.svg'
import './App.css';
import PostSnippet from './components/PostSnippet'
import PostForm from './components/PostForm'
import Modal from 'react-modal'
import * as API from './ContentStorageAPI'
import * as Actions from './actions'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(Actions.loadPosts())
    this.props.dispatch(Actions.loadCategories())
  }

  toggleNewPostModal(currentStatus) {
      this.props.dispatch(Actions.toggleNewPostModal(currentStatus))
  }

  toggleEditPostModal(currentStatus, post) {
    this.props.dispatch(Actions.toggleEditPostModal(currentStatus, post));
  }

  deletePost( id ) {
    this.props.dispatch(Actions.deletePost( id ));
  }

  render() {
    Modal.setAppElement(document.getElementById('AppBody'));

    const { posts, categories, modals } = this.props;
    const { isOpenPostForm } = modals;

    return (
      <div id="AppBody" className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="add-button"
              onClick={() => this.toggleNewPostModal(isOpenPostForm)}>
              Add new post
          </h1>
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
                    <PostSnippet p={p} loadEditForm={this.toggleEditPostModal.bind(this)} deletePost={this.deletePost.bind(this)}/>
                  }</li>)
                )
            }</ul>
          }
        </div>
        <hr/>
        <Modal
          className='modal'
          isOpen={isOpenPostForm}
          contentLabel='Modal'
          shouldCloseOnOverlayClick={false}
        >
          <h2 onClick={() => this.toggleNewPostModal(isOpenPostForm, false)}>X</h2>
          <PostForm/>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps ({ posts, categories, modals }) {
  return { posts, categories, modals }
}

export default connect(mapStateToProps)(App);
