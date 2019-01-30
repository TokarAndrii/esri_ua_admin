import { combineReducers } from 'redux';
import isAuthenticatedReducer from './isAuthenticatedReducer';
import authTokenReducer from './authTokenReducer';

export default combineReducers({
  isAuthenticated: isAuthenticatedReducer,
  authToken: authTokenReducer,
});
