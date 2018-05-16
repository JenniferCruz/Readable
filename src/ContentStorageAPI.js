const api = 'http://localhost:3001';

const headersGet = {
  'Accept': 'application/json',
  'Authorization': ':-)'
}

export const getPosts = () =>
  fetch(`${api}/posts`, { headers: headersGet })
    .then(res => res.json());

export const getCategories = () =>
  fetch(`${api}/categories`, { headers: headersGet })
    .then(res => res.json())
