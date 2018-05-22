const api = 'http://localhost:3001';

const headersGet = {
  'Accept': 'application/json',
  'Authorization': ':-)'
}

const headersPost = (data) => {
  return {
    body: JSON.stringify(data),
    headers: {
        'content-type': 'application/json',
        'Authorization': ':-)'
    },
    method: 'POST',
    mode: 'cors',
    redirect: 'follow'
  }
}

const headersPut = (data) => {
  return {
    body: JSON.stringify(data),
    headers: {
        'content-type': 'application/json',
        'Authorization': ':-)'
    },
    method: 'PUT',
    mode: 'cors',
    redirect: 'follow'
  }
}

const headersDelete = () => {
  return {
    headers: {
        'content-type': 'application/json',
        'Authorization': ':-)'
    },
    method: 'DELETE',
    mode: 'cors',
    redirect: 'follow'
  }
}


export const getPosts = () =>
  fetch(`${api}/posts`, { headers: headersGet })
    .then(res => res.json())
    .catch(err => {/*TODO*/});

export const getCategories = () =>
  fetch(`${api}/categories`, { headers: headersGet })
    .then(res => res.json())
    .catch(err => {/*TODO*/});

export const savePost = ( post ) =>
  fetch(`${api}/posts`,
      headersPost({
        id: Date.now(),
        timestamp: Date.now(),
        title: post.title,
        body: post.body,
        author: post.author,
        category: post.category
      }))
    .then(res => res.json())

export const updatePost = ( post ) =>
  fetch(`${api}/posts/${post.id}`,
    headersPut({
      title: post.title,
      body: post.body,
    }))
    .then(res => res.json())

export const updateVote = ( itemID, itemType, vote ) =>
  fetch(`${api}/${itemType}/${itemID}`, headersPost(
      { option: vote > 0 ? 'upVote' : 'downVote'}))
    .then(res => res.json())


export const remove = ( itemID, itemType ) =>
  fetch(`${api}/${itemType}/${itemID}`, headersDelete())
    .then(res => res.json())

export const getComments = id =>
  fetch(`${api}/posts/${id}/comments`, { headers: headersGet })
    .then(res => res.json());
