import newsActionsTypes from './newsActionsTypes';

const FETCH_START = () => ({
  type: newsActionsTypes.FETCH_START,
});

const FETCH_SUCCESS_NEWS_LIST = newsList => ({
  type: newsActionsTypes.FETCH_SUCCESS_NEWS_LIST,
  payload: newsList,
});

const FETCH_ADD_SUCCESS_NEWS_LIST_ITEM = newsItem => ({
  type: newsActionsTypes.FETCH_ADD_SUCCESS_NEWS_LIST_ITEM,
  payload: newsItem,
});

const FETCH_SUCCESS_DELETE_NEWS_LIST_ITEM = id => ({
  type: newsActionsTypes.FETCH_SUCCESS_DELETE_NEWS_LIST_ITEM,
  payload: id,
});

export default {
  FETCH_START,
  FETCH_SUCCESS_NEWS_LIST,
  FETCH_ADD_SUCCESS_NEWS_LIST_ITEM,
  FETCH_SUCCESS_DELETE_NEWS_LIST_ITEM,
};
