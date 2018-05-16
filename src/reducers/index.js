import { combineReducers } from 'redux'
import {
  LOAD_POSTS,
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

export default combineReducers({
  posts,
  categories
});
