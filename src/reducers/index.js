import { combineReducers } from 'redux'
import {
  LOAD_POSTS,
  LOAD_CATEGORIES,
  LOAD_ACTIVE_POSTS_COMMENTS,
  TOGGLE_NEW_POST_MODAL,
  TOGGLE_EDIT_POST_MODAL,
  TOGGLE_COMMENT_FORM,
  OPEN_EDIT_COMMENT_FORM,
  UPDATE_ACTIVE_CATEGORY,
  UPDATE_COMMENT,
  UPDATE_POST_IN_EDITION,
  UPDATE_COMMENT_IN_EDITION,
  UPDATE_POST_IN_LIST,
  DELETE_POST_FROM_LIST,
  DELETE_COMMENT_FROM_LIST,
  ORDER_POSTS_BY_SCORE,
  ORDER_POSTS_BY_DATE,
  UPDATE_COMMENTS_COUNT
} from '../actions'

function getIndex(item, list) {
  return list.findIndex(e => e.id.toString() === item.id.toString());
}

function getUpdatedList(list, newElement) {
  list = list.slice(0);
  const i = getIndex(newElement, list);
  if (i < 0) // is a new element
    list.push(newElement);
  else
    list[i] = newElement;
  return list;
}

function deleteFromList(list, element) {
  list = list.slice(0);
  const i = getIndex(element, list);
  list.splice(i, 1);
  return list;
}


function posts(posts = [], action) {
  switch (action.type) {
    case UPDATE_POST_IN_LIST:
      return getUpdatedList(posts, action.post);
    case UPDATE_COMMENTS_COUNT:
      const i = getIndex({id: action.postID}, posts);
      const p = Object.assign({}, posts[i]);
      p.commentCount += action.change;
      return getUpdatedList(posts, p);
    case DELETE_POST_FROM_LIST:
      return deleteFromList(posts, {id: action.id});
    case LOAD_POSTS:
      return action.posts;
    case ORDER_POSTS_BY_SCORE:
      posts = posts.slice(0);
      return posts.sort((p, q) => p.voteScore < q.voteScore);
    case ORDER_POSTS_BY_DATE:
      posts = posts.slice(0);
      return posts.sort((p, q) => p.timestamp < q.timestamp);
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
      return getUpdatedList(comments, action.comment);
    case DELETE_COMMENT_FROM_LIST:
      return deleteFromList(comments, {id: action.id});
    default:
      return comments;
  }
}

function activeOptions(tuningOptions = { isOpenPostForm: false,
                                         isOpenCommentForm: false,
                                         postInEdition: {},
                                         commentInEdition: {},
                                         selectedCategory: null }, action) {

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
    case TOGGLE_COMMENT_FORM:
      return {
        isOpenCommentForm: !action.isOpen
      }
    case OPEN_EDIT_COMMENT_FORM:
      return {
        isOpenCommentForm: true,
        commentInEdition: action.comment
      }
    case UPDATE_COMMENT_IN_EDITION:
      return {
        isOpenCommentForm: true,
        commentInEdition: action.comment
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
      return tuningOptions;
  }
}

export default combineReducers({
  posts,
  categories,
  activeOptions,
  comments
});
