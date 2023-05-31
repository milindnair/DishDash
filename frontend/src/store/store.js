import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// Define the initial state
const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
  };
  
  // Define the reducer function
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN':
        localStorage.setItem('isLoggedIn', true);
        return { ...state, isLoggedIn: true };
      case 'LOGOUT':
        localStorage.setItem('isLoggedIn', false);
        return { ...state, isLoggedIn: false };
      default:
        return state;
    }
  };

// Create the store
const store = createStore(reducer, applyMiddleware(thunk));

export default store;