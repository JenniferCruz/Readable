import * as API from '../utils/ContentStorageAPI'

export const LOAD_POSTS = "LOAD_POSTS";
export const LOAD_CATEGORIES = "LOAD_CATEGORIES";
export const LOAD_ACTIVE_POSTS_COMMENTS = "LOAD_ACTIVE_POSTS_COMMENTS";
export const TOGGLE_NEW_POST_MODAL = "TOGGLE_POST_FORM_MODAL";
export const TOGGLE_EDIT_POST_MODAL = "TOGGLE_EDIT_POST_MODAL";
export const TOGGLE_COMMENT_FORM = "TOGGLE_COMMENT_FORM";
export const OPEN_EDIT_FORM_MODAL = "OPEN_EDIT_FORM_MODAL";
export const OPEN_EDIT_COMMENT_FORM = "OPEN_EDIT_COMMENT_FORM";
export const UPDATE_POST_IN_EDITION = "UPDATE_POST_IN_EDITION";
export const UPDATE_COMMENT_IN_EDITION = "UPDATE_COMMENT_IN_EDITION";
export const UPDATE_ACTIVE_CATEGORY = "UPDATE_ACTIVE_CATEGORY";
export const UPDATE_COMMENT = "UPDATE_COMMENT";
export const UPDATE_COMMENTS_COUNT = "UPDATE_COMMENTS_COUNT";
export const UPDATE_POST_IN_LIST = "UPDATE_POST_IN_LIST";
export const DELETE_POST_FROM_LIST = "DELETE_POST_FROM_LIST";
export const DELETE_COMMENT_FROM_LIST = "DELETE_COMMENT_FROM_LIST";
export const ORDER_POSTS_BY_SCORE = 'ORDER_POSTS_BY_SCORE';
export const ORDER_POSTS_BY_DATE = 'ORDER_POSTS_BY_DATE';

function updateComment( comment ) {
  return {
    type: UPDATE_COMMENT,
    comment
  }
}


function updateListWithPost( post ) {
  return {
    type: UPDATE_POST_IN_LIST,
    post
  }
}

function deletePostFromList( id ) {
  return {
    type: DELETE_POST_FROM_LIST,
    id
  }
}

function deleteCommentFromList( id ) {
  return {
    type: DELETE_COMMENT_FROM_LIST,
    id
  }
}

function updateCommentsCount( postID, change ) {
  return {
    type: UPDATE_COMMENTS_COUNT,
    change,
    postID
  }
}

export function editComment( comment ) {
  return {
    type: OPEN_EDIT_COMMENT_FORM,
    comment
  }
}

export function orderPosts( byCriteria ) {
  return {
    type: byCriteria
  }
}

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

export function toggleCommentForm( isOpen ) {
  return {
    type: TOGGLE_COMMENT_FORM,
    isOpen
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

export function updateCommentInEdition( comment ) {
  return {
    type: UPDATE_COMMENT_IN_EDITION,
    comment
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

export const updateVoteScore = (item, vote) => dispatch => {
  const itemType = getItemType(item);
  const update = itemType === "posts" ? updateListWithPost : updateComment;
  API.updateVote(item.id, itemType, vote ).then(updatedItem =>
    dispatch(update( updatedItem ))
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

export const saveComment = comment => dispatch => {
  const save = comment.id === undefined ? API.saveComment : API.updateComment;
  save( comment ).then( c => {
    dispatch(toggleCommentForm( true ));
    dispatch(updateComment( c ));
    dispatch(updateCommentsCount( c.parentId, 1 ))
  })
}

export const remove = item => dispatch => {
  const type = getItemType(item);
  return API.remove( item.id, type ).then(res => {
    if (type === "comments") {
      dispatch(deleteCommentFromList( item.id ));
      dispatch(updateCommentsCount( item.parentId, -1 ))
    } else {
      dispatch(deletePostFromList( item.id ));
    }
  });
}

function getItemType(item) {
  return item.title ? "posts" : "comments";
}
