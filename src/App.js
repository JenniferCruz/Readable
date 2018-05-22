import React, { Component } from 'react';
import { connect } from 'react-redux'
import { BrowserRouter, Link, Route } from 'react-router-dom'
import logo from './logo.svg'
import './App.css';
import PostForm from './components/PostForm'
import Header from './components/Header'
import Categories from './components/Categories'
import PostsList from './components/PostsList'
import PostPage from './components/PostPage'
import Modal from 'react-modal'
import * as API from './ContentStorageAPI'
import * as Actions from './actions'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(Actions.loadPosts())
    this.props.dispatch(Actions.loadCategories())
  }

  toggleModal(currentStatus, post) {
    if (post)
      this.props.dispatch(Actions.toggleEditPostModal(currentStatus, post));
    else
      this.props.dispatch(Actions.toggleNewPostModal(currentStatus))
  }

  deletePost( id ) {
    this.props.dispatch(Actions.deletePost( id ));
  }

  render() {
    Modal.setAppElement(document.getElementById('AppBody'));

    const { posts, categories, activeOptions } = this.props;
    const { isOpenPostForm } = activeOptions;

    return (
    <BrowserRouter>
      <div id="AppBody" className="App">
        <Header toggleModal={this.toggleModal.bind(this)}/>
        <Route path="/" component={Categories}/>
        <Route exact path='/' render={routeProps =>
          (<PostsList {...routeProps} toggleModal={this.toggleModal.bind(this)}
                      deletePost={this.deletePost.bind(this)}/>)
        }/>

        <Route exact path='/:cname' render={routeProps =>
          (<PostsList {...routeProps} toggleModal={this.toggleModal.bind(this)}
                      deletePost={this.deletePost.bind(this)}/>)
        }/>

        <Route exact path='/:cname/:pid' component={PostPage}/>


        <Modal
          className='modal'
          isOpen={isOpenPostForm}
          contentLabel='Modal'
          shouldCloseOnOverlayClick={false}
        >
          <h2 onClick={() => this.toggleModal(isOpenPostForm, false)}>X</h2>
          <PostForm/>
        </Modal>
      </div>
    </BrowserRouter>
    );
  }
}

function mapStateToProps ({ posts, categories, activeOptions }) {
  return { posts, categories, activeOptions }
}

export default connect(mapStateToProps)(App);
