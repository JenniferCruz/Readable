import { combineReducers } from 'redux'
import {
  LOAD_POSTS,
  APPEND_NEW_POST,
  TOGGLE_POST_FORM_MODAL,
  OPEN_EDIT_FORM_MODAL,
  LOAD_CATEGORIES
} from '../actions'

function posts(posts = [], action) {
  switch (action.type) {
    case LOAD_POSTS:
      return action.posts;
    case APPEND_NEW_POST:
      const newPostsList = posts.slice(0);
      newPostsList.push(action.newPost);
      return newPostsList;
    default:
      return posts;
  }
}

function categories(categories = [], action) {
  switch (action.type) {
    case LOAD_CATEGORIES:
      return action.categories;
    default:
      return categories;
  }
}

function modals(modalsStatus = { isOpenPostForm: false, isNewPost: false }, action) {
  switch (action.type) {
    case TOGGLE_POST_FORM_MODAL:
      return {
        isOpenPostForm: action.isOpen,
        isNewPost: action.isNewPost
      };
    case OPEN_EDIT_FORM_MODAL:
      return {
        isOpenPostForm: action.isOpen,
        postInEdition: action.post
      }
    default:
      return modalsStatus;
  }
}

export default combineReducers({
  posts,
  categories,
  modals
});
