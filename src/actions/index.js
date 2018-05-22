import * as API from '../ContentStorageAPI'

export const LOAD_POSTS = "LOAD_POSTS";
export const LOAD_CATEGORIES = "LOAD_CATEGORIES";
export const UPDATE_POST_IN_LIST = "UPDATE_POST_IN_LIST";
export const DELETE_POST_FROM_LIST = "DELETE_POST_FROM_LIST";
export const UPDATE_POST_IN_EDITION = "UPDATE_POST_IN_EDITION";
export const UPDATE_ACTIVE_CATEGORY = "UPDATE_ACTIVE_CATEGORY";
export const TOGGLE_NEW_POST_MODAL = "TOGGLE_POST_FORM_MODAL";
export const TOGGLE_EDIT_POST_MODAL = "TOGGLE_EDIT_POST_MODAL";
export const OPEN_EDIT_FORM_MODAL = "OPEN_EDIT_FORM_MODAL";
export const LOAD_ACTIVE_POSTS_COMMENTS = "LOAD_ACTIVE_POSTS_COMMENTS";

export const loadPosts = () => dispatch => {
  API.getPosts().then(posts => dispatch({
    type: LOAD_POSTS,
    posts
  }));
}

export const loadCategories = () => dispatch => {
  API.getCategories().then(categories => dispatch({
      type: LOAD_CATEGORIES,
      categories: categories.categories
    })
  )}

export function toggleNewPostModal( isOpen ) {
  return {
    type: TOGGLE_NEW_POST_MODAL,
    isOpen: !isOpen
  }
}

export function toggleEditPostModal( isOpen, post ) {
  return {
    type: TOGGLE_EDIT_POST_MODAL,
    isOpen,
    post
  }
}

export function updatePostInEdition( post ) {
  return {
    type: UPDATE_POST_IN_EDITION,
    isOpen: true,
    post
  }
}

export function updateListWithPost( post ) {
  return {
    type: UPDATE_POST_IN_LIST,
    post
  }
}

export function deletePostFromList( id ) {
  return {
    type: DELETE_POST_FROM_LIST,
    id
  }
}

export function updateActiveCategory( name ) {
  return {
    type: UPDATE_ACTIVE_CATEGORY,
    name
  }
}

export const loadComments = postID => dispatch => {
  API.getComments( postID ).then( comments => dispatch({
      type: LOAD_ACTIVE_POSTS_COMMENTS,
      comments
    }))
}

export const updateVoteScore = (id, vote) => dispatch => {
  API.updatePostVote(id, vote).then(updatedPost =>
    dispatch(updateListWithPost( updatedPost ))
  );
}

export const savePost = post => dispatch => {
  const save = post.id === undefined ? API.savePost : API.updatePost;
  save( post ).then( p => {
    dispatch(updateListWithPost( p ))
    dispatch(updatePostInEdition({}, true));
    dispatch(toggleNewPostModal(true));

  })
};

export const deletePost = id => dispatch =>
  API.deletePost( id ).then(res => dispatch(deletePostFromList( id )));
