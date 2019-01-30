import authTypes from '../types/authTypes';

const authTokenReducer = (state = null, { type, payload }) => {
  switch (type) {
    case authTypes.LOG_IN_REQUEST_SUCCESS:
      return payload.token;
    case authTypes.LOG_OUT_REQUEST_SUCCESS:
    case authTypes.LOG_IN_REQUEST_ERROR:
      return null;
    default:
      return state;
  }
};

export default authTokenReducer;
