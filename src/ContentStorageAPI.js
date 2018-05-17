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


export const getPosts = () =>
  fetch(`${api}/posts`, { headers: headersGet })
    .then(res => res.json());

export const getCategories = () =>
  fetch(`${api}/categories`, { headers: headersGet })
    .then(res => res.json())

export const saveNewPost = ( post ) =>
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
