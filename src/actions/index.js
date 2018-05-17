export const LOAD_POSTS = "LOAD_POSTS";
export const LOAD_CATEGORIES = "LOAD_CATEGORIES";
export const TOGGLE_POST_FORM_MODAL = "TOGGLE_POST_FORM_MODAL";
export const APPEND_NEW_POST = "APPEND_NEW_POST";

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

export function togglePostFormModal( isOpen, isNewPost ) {
  return {
    type: TOGGLE_POST_FORM_MODAL,
    isOpen,
    isNewPost
  }
}

export function appendNewPost( newPost ) {
  return {
    type: APPEND_NEW_POST,
    newPost
  }
}
