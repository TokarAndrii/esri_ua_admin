import axios from 'axios';
import authActions from '../actions/authActions';
import apiConfig from '../../config';

const { ip, port, apiRootUrl, proptocol } = apiConfig;

const setAuthHeader = token => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const logIn = credentials => dispatch => {
  dispatch(authActions.AUTH_REQUEST_START());

  const axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  };

  axios
    .post(
      `${proptocol}://${ip}:${port}/${apiRootUrl}/auth/login/`,
      credentials,
      axiosConfig,
    )
    .then(resp => {
      /* eslint-disable-next-line */
      console.log(resp.data.token, ' - resp at logIn');
      dispatch(authActions.LOG_IN_REQUEST_SUCCESS(resp.data.token));
    })
    .catch(err => {
      if (err.response) {
        /* eslint-disable-next-line */
        console.log(
          err.response.data.message,
          ' -err.response.data.message at log in',
        );
        // TO DO auth action for log-in error
      }
    });
};

const refreshCurrentUser = () => (dispatch, getState) => {
  const { authToken } = getState().session;

  if (!authToken) return;

  setAuthHeader(authToken);

  dispatch(authActions.REFRESH_CURRENT_USER_START());

  axios
    .get(`${proptocol}://${ip}:${port}/${apiRootUrl}/auth/check/`)
    .then(resp => {
      /* eslint-disable-next-line */
      console.log(resp, ' - resp at refreshCurrentUser ');
      dispatch(authActions.REFRESH_CURRENT_USER_SUCCESS());
    });
};

export default { logIn, refreshCurrentUser };
