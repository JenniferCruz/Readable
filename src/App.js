import React, { Component } from 'react';
import { connect } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css';
import PostForm from './components/PostForm'
import Header from './components/Header'
import Categories from './components/Categories'
import PostsList from './components/PostsList'
import PostPage from './components/PostPage'
import Modal from 'react-modal'
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

  render() {
    Modal.setAppElement(document.getElementById('AppBody'));

    const activeOptions = this.props.activeOptions;
    const { isOpenPostForm } = activeOptions;

    return (
    <BrowserRouter>
      <div id="AppBody" className="App">
        <Header toggleModal={this.toggleModal.bind(this)}/>
        <div className="body-content">
          <Route path="/" component={Categories}/>
          <Route exact path='/' component={PostsList} />
          <Route exact path='/:cname' component={PostsList} />

          <Route exact path='/:cname/:pid' component={PostPage}/>


          <Modal
            className='modal'
            isOpen={isOpenPostForm}
            contentLabel='Modal'
            shouldCloseOnOverlayClick={false}
          >
            <PostForm toggleModal={this.toggleModal.bind(this)}/>
          </Modal>
        </div>
      </div>
    </BrowserRouter>
    );
  }
}

function mapStateToProps ({ activeOptions }) {
  return { activeOptions }
}

export default connect(mapStateToProps)(App);
