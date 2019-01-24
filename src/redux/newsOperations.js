import axios from 'axios';
import qs from 'qs';
import newsActions from './newsActions';
import newsApiServices from '../services/newsServicesApi';

const fetchNewsList = () => dispatch => {
  dispatch(newsActions.FETCH_START());
  axios.get('http://192.168.0.53:9091/api/v1/news/all/').then(resp => {
    dispatch(newsActions.FETCH_SUCCESS_NEWS_LIST(resp.data.data));
  });
};

const addNews = (title, preview, content) => dispatch => {
  dispatch(newsActions.FETCH_START());

  newsApiServices
    .createNewsItem(title, preview, content)
    .then(data => dispatch(newsActions.FETCH_ADD_SUCCESS_NEWS_LIST_ITEM(data)));
  // TO DO catch error
  // .catch(error => dispatch(actions.fetchError(error)));
};

const addNewsAndImages = (title, preview, content, formData) => dispatch => {
  axios
    .post(
      `http://192.168.0.53:9091/api/v1/news/create/`,
      qs.stringify({ title, preview, content }),
    )
    .then(resp => {
      fetch(`http://192.168.0.53:9091/api/v1/image/upload/${resp.data.id}`, {
        method: 'POST',
        body: formData,
        headers: {
          Expect: '100-continue',
        },
      }).then(responce => {
        dispatch(newsActions.FETCH_ADD_SUCCESS_NEWS_LIST_ITEM(responce));
      });
    });
};

const deleteNews = id => dispatch => {
  dispatch(newsActions.FETCH_START());

  newsApiServices
    .deleteByIdNewsItem(id)
    .then(
      isOk =>
        isOk && dispatch(newsActions.FETCH_SUCCESS_DELETE_NEWS_LIST_ITEM(id)),
    );
  // TO DO catch error
  // .catch(error => dispatch(actions.fetchError(error)));
};

export default {
  fetchNewsList,
  addNews,
  deleteNews,
  addNewsAndImages,
};
