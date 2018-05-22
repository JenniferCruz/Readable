import { combineReducers } from 'redux'
import {
  LOAD_POSTS,
  TOGGLE_NEW_POST_MODAL,
  TOGGLE_EDIT_POST_MODAL,
  LOAD_CATEGORIES,
  UPDATE_POST_IN_EDITION,
  UPDATE_POST_IN_LIST,
  DELETE_POST_FROM_LIST,
  UPDATE_ACTIVE_CATEGORY,
  LOAD_ACTIVE_POSTS_COMMENTS
} from '../actions'

function posts(posts = [], action) {
  switch (action.type) {
    case UPDATE_POST_IN_LIST:
      posts = posts.slice(0);
      const i = posts.findIndex(p => p.id === action.post.id);
      if (i < 0) // is a new post
        posts.push(action.post);
      else
        posts[i] = action.post;
      return posts;
    case DELETE_POST_FROM_LIST:
      posts = posts.slice(0);
      const j = posts.findIndex(p => p.id === action.id);
      posts.splice(j, j+1);
      return posts;
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

function comments(comments =[], action) {
  switch (action.type) {
    case LOAD_ACTIVE_POSTS_COMMENTS:
      return action.comments;
    default:
      return comments;
  }
}

function activeOptions(modalsStatus = { isOpenPostForm: false, postInEdition: {}, selectedCategory: null }, action) {
  switch (action.type) {
    case TOGGLE_NEW_POST_MODAL:
      return {
        isOpenPostForm: action.isOpen,
        postInEdition: {},
        isNewPost: action.isOpen
      };
    case TOGGLE_EDIT_POST_MODAL:
      return {
        isOpenPostForm: action.isOpen,
        postInEdition: action.isOpen ? action.post : {},
        isNewPost: false
      }
    case UPDATE_POST_IN_EDITION:
      return {
        postInEdition: action.post,
        isOpenPostForm: action.isOpen
      }
    case UPDATE_ACTIVE_CATEGORY:
      return {
        // TODO
      }
    default:
      return modalsStatus;
  }
}

export default combineReducers({
  posts,
  categories,
  activeOptions,
  comments
});
