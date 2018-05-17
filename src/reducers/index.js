import { combineReducers } from 'redux'
import {
  LOAD_POSTS,
  TOGGLE_POST_FORM_MODAL,
  LOAD_CATEGORIES
} from '../actions'

function posts(posts = [], action) {
  switch (action.type) {
    case LOAD_POSTS:
      return action.posts;
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

function modals(modalsStatus = { isOpenPostForm: false }, action) {
  switch (action.type) {
    case TOGGLE_POST_FORM_MODAL:
      return {isOpenPostForm: action.isOpen};
    default:
      return modalsStatus;
  }
}

export default combineReducers({
  posts,
  categories,
  modals
});
