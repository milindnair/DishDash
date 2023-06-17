import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// Define the initial state
const initialState = {
  isLoggedIn: sessionStorage.getItem('isLoggedIn') === 'true' || false,
  username: sessionStorage.getItem('username') || '',
  email: sessionStorage.getItem('email') || '',
  followers: JSON.parse(sessionStorage.getItem('followers') || '[]'),
  following: JSON.parse(sessionStorage.getItem('following') || '[]'),
  posts: sessionStorage.getItem('posts') || '',
  Bio:sessionStorage.getItem('Bio') || '',
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      sessionStorage.setItem('isLoggedIn', true);
      sessionStorage.setItem('username', action.username);
      sessionStorage.setItem('email', action.email);
      sessionStorage.setItem('followers', JSON.stringify(action.followers || []));
      sessionStorage.setItem('following', JSON.stringify(action.following || []));
      sessionStorage.setItem('posts', action.posts);
      sessionStorage.setItem('Bio',action.Bio);

      return { ...state, isLoggedIn: true, username: action.username, email: action.email, followers: action.followers, following: action.following, posts: action.posts , Bio:action.Bio };
    case 'LOGOUT':
      sessionStorage.setItem('isLoggedIn', false);
      sessionStorage.removeItem('username');
      sessionStorage.removeItem('email');
      sessionStorage.removeItem('followers');
      sessionStorage.removeItem('following');
      sessionStorage.removeItem('posts');
      sessionStorage.removeItem('Bio');

      return { ...state, isLoggedIn: false, username: '', email: '', followers: [], following: [], posts: '' };
    case 'FOLLOW':
      const updatedFollowing = [...state.following, action.payload];
      console.log(updatedFollowing);
      sessionStorage.setItem('following', JSON.stringify(updatedFollowing));
      return { ...state, following: updatedFollowing };
    case 'UNFOLLOW':
      const updatedFollowing2 = state.following.filter((user) => user !== action.payload);
      sessionStorage.setItem('following', JSON.stringify(updatedFollowing2));
      return { ...state, following: updatedFollowing2 };
    default:
      return state;
  }
};

// Create the store
const store = createStore(reducer, applyMiddleware(thunk));

export default store;
