import { combineReducers } from 'redux'
import {
  LOAD_POSTS,
  LOAD_CATEGORIES,
  LOAD_ACTIVE_POSTS_COMMENTS,
  TOGGLE_NEW_POST_MODAL,
  TOGGLE_EDIT_POST_MODAL,
  UPDATE_ACTIVE_CATEGORY,
  UPDATE_COMMENT,
  UPDATE_POST_IN_EDITION,
  UPDATE_POST_IN_LIST,
  DELETE_POST_FROM_LIST
} from '../actions'

function getUpdtedList(list, newElement) {
  list = list.slice(0);
  const i = list.findIndex(e => e.id === newElement.id);
  if (i < 0) // is a new element
    list.push(newElement);
  else
    list[i] = newElement;
  return list;

}

function posts(posts = [], action) {
  switch (action.type) {
    case UPDATE_POST_IN_LIST:
      return getUpdtedList(posts, action.post);
    case DELETE_POST_FROM_LIST:
      posts = posts.slice(0);
      const j = posts.findIndex(p => p.id === action.id);
      posts.splice(j, 1);
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
    case UPDATE_COMMENT:
      return getUpdtedList(comments, action.comment);
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
