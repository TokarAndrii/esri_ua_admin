import authTypes from '../types/authTypes';

const isAuthenticatedReducer = (state = false, { type }) => {
  switch (type) {
    case authTypes.LOG_IN_REQUEST_SUCCESS:
    case authTypes.REFRESH_CURRENT_USER_SUCCESS:
      return true;
    case authTypes.LOG_OUT_REQUEST_SUCCESS:
    case authTypes.LOG_IN_REQUEST_ERROR:
      return false;
    default:
      return state;
  }
};

export default isAuthenticatedReducer;
