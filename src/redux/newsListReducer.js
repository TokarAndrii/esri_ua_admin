import newsActionsTypes from './newsActionsTypes';

const menuListReducer = (state = [], { type, payload }) => {
  switch (type) {
    case newsActionsTypes.FETCH_SUCCESS_NEWS_LIST:
      return payload;
    case newsActionsTypes.FETCH_ADD_SUCCESS_NEWS_LIST_ITEM:
      return [...state, payload];
    case newsActionsTypes.FETCH_SUCCESS_DELETE_NEWS_LIST_ITEM:
      return state.filter(currNews => currNews.id !== payload);
    default:
      return state;
  }
};

export default menuListReducer;
