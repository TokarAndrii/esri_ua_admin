import authTypes from '../types/authTypes';

const REFRESH_CURRENT_USER_START = () => ({
  type: authTypes.REFRESH_CURRENT_USER_START,
});

const REFRESH_CURRENT_USER_SUCCESS = user => ({
  type: authTypes.REFRESH_CURRENT_USER_SUCCESS,
  payload: { user },
});

const LOG_IN_REQUEST_SUCCESS = token => ({
  type: authTypes.LOG_IN_REQUEST_SUCCESS,
  payload: { token },
});

const LOG_OUT_REQUEST_SUCCESS = () => ({
  type: authTypes.LOG_OUT_REQUEST_SUCCESS,
});

const AUTH_REQUEST_START = () => ({
  type: authTypes.AUTH_REQUEST_START,
});

export default {
  REFRESH_CURRENT_USER_START,
  REFRESH_CURRENT_USER_SUCCESS,
  LOG_IN_REQUEST_SUCCESS,
  LOG_OUT_REQUEST_SUCCESS,
  AUTH_REQUEST_START,
};
