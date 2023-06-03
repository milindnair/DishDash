import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// Define the initial state
const initialState = {
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
  username: localStorage.getItem('username') || '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      localStorage.setItem('isLoggedIn', true);
      localStorage.setItem('username', action.username);
      return { ...state, isLoggedIn: true, username: action.username };
    case 'LOGOUT':
      localStorage.setItem('isLoggedIn', false);
      localStorage.removeItem('username');
      return { ...state, isLoggedIn: false, username: '' };
    default:
      return state;
  }
};

// Create the store
const store = createStore(reducer, applyMiddleware(thunk));

export default store;