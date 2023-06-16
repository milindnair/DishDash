import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// Define the initial state
const initialState = {
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
  username: localStorage.getItem('username') || '',
  email: localStorage.getItem('email') || '',
  followers: JSON.parse(localStorage.getItem('followers') || '[]'),
  following: JSON.parse(localStorage.getItem('following') || '[]'),
  posts: localStorage.getItem('posts') || '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('username', action.username);
      localStorage.setItem('email', action.email);
      localStorage.setItem('followers', JSON.stringify(action.followers || []));
      localStorage.setItem('following', JSON.stringify(action.following || []));
      localStorage.setItem('posts', action.posts);

      return { ...state, isLoggedIn: true, username: action.username, email: action.email, followers: action.followers, following: action.following, posts: action.posts };
    case 'LOGOUT':
      localStorage.setItem('isLoggedIn', false);
      localStorage.removeItem('username');
      localStorage.removeItem('email');
      localStorage.removeItem('followers');
      localStorage.removeItem('following');
      localStorage.removeItem('posts');

      return { ...state, isLoggedIn: false, username: '', email: '', followers: [], following: [], posts: '' };
    default:
      return state;
  }
};

// Create the store
const store = createStore(reducer, applyMiddleware(thunk));

export default store;
