export const LOAD_POSTS = "LOAD_POSTS";
export const LOAD_CATEGORIES = "LOAD_CATEGORIES";

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
