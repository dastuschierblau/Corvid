/* Shared action creators */
const RECEIVE_POSTS = "RECEIVE_POSTS",
  EMPTY_POSTS = "EMPTY_POSTS",
  ADD_POST = "ADD_POST",
  TOGGLE_POST = "SET_POST",
  TOGGLE_LOADING = "TOGGLE_LOADING",
  REMOVE_POST = "REMOVE_POST",
  LOAD_SUGGESTIONS = "LOAD_SUGGESTIONS",
  RESET_SUGGESTIONS = "RESET_SUGGESTIONS",
  USER_LOGOUT = "USER_LOGOUT",
  USER_LOGIN = "USER_LOGIN";

import { getInitialData } from "../utils/API.js";
import { generateId } from "../utils/helpers.js";

export function login(user) {
  return {
    type: USER_LOGIN,
    username: user
  };
}

export function logout() {
  return {
    type: USER_LOGOUT
  };
}

export function toggleLoading() {
  return {
    type: TOGGLE_LOADING
  };
}

export function addPost({ title, content, code, tags, author }) {
  return {
    type: ADD_POST,
    post: {
      title,
      content,
      code,
      keywords: tags,
      timestamp: new Date(),
      id: generateId(),
      author
    }
  };
}

export function removePost(id) {
  return {
    type: REMOVE_POST,
    id
  };
}

export function receivePosts(posts) {
  return {
    type: RECEIVE_POSTS,
    posts
  };
}

export function handleReceivePosts() {
  return dispatch => {
    dispatch(toggleLoading());
    getInitialData()
      .then(posts => {
        dispatch(toggleLoading());
        dispatch(receivePosts(posts));
      })
      .catch(err => console.err(err));
  };
}

export function setCurrentPost(post) {
  return {
    type: TOGGLE_POST,
    post
  };
}

export function resetSuggestions() {
  return {
    type: RESET_SUGGESTIONS
  };
}

export function loadSuggestions(suggestions) {
  return {
    type: LOAD_SUGGESTIONS,
    suggestions
  };
}

export function emptyPosts() {
  return {
    type: EMPTY_POSTS
  };
}
