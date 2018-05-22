export function getCurrentPostID() {
  return window.location.pathname.split("/").pop();
}
