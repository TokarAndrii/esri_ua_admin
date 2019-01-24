import newsActionsTypes from './newsActionsTypes';

const loadingReducer = (state = true, { type }) => {
  switch (type) {
    case newsActionsTypes.FETCH_START:
      return true;
    case newsActionsTypes.FETCH_SUCCESS_NEWS_LIST:
    case newsActionsTypes.FETCH_ERROR:
      return false;
    default:
      return state;
  }
};

export default loadingReducer;
