export const LOAD_POSTS = "LOAD_POSTS";
export const LOAD_CATEGORIES = "LOAD_CATEGORIES";
export const TOGGLE_NEW_POST_MODAL = "TOGGLE_POST_FORM_MODAL";
export const TOGGLE_EDIT_POST_MODAL = "TOGGLE_EDIT_POST_MODAL";
export const APPEND_NEW_POST = "APPEND_NEW_POST";
export const OPEN_EDIT_FORM_MODAL = "OPEN_EDIT_FORM_MODAL";

export function loadPosts( posts ) {
  return {
    type: LOAD_POSTS,
    posts
  }
}

export function loadCategories( categories ) {
  return {
    type: LOAD_CATEGORIES,
    categories
  }
}

export function toggleNewPostModal( isOpen ) {
  return {
    type: TOGGLE_NEW_POST_MODAL,
    isOpen: !isOpen
  }
}

export function toggleEditPostModal( isOpen, post ) {
  return {
    type: TOGGLE_EDIT_POST_MODAL,
    isOpen: isOpen,
    post
  }
}

export function appendNewPost( newPost ) {
  return {
    type: APPEND_NEW_POST,
    newPost
  }
}
