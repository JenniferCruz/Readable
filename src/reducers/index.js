import { combineReducers } from 'redux'
import {
  LOAD_POSTS,
  APPEND_NEW_POST,
  TOGGLE_NEW_POST_MODAL,
  TOGGLE_EDIT_POST_MODAL,
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

function modals(modalsStatus = { isOpenPostForm: false, postInEdition: {} }, action) {
  switch (action.type) {
    case TOGGLE_NEW_POST_MODAL:
      return {
        isOpenPostForm: action.isOpen,
        postInEdition: {},
        isNewPost: action.isOpen
      };
    case TOGGLE_EDIT_POST_MODAL:
      return {
        isOpenPostForm: true,
        postInEdition: action.isOpen ? action.post : {},
        isNewPost: false
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
