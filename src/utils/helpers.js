export function getCurrentPostID() {
  return window.location.pathname.split("/").pop();
}

export function getDate(timestamp) {
  return new Date(timestamp).toDateString();
}
