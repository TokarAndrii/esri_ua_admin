import newsActionsTypes from '../types/newsActionsTypes';
import carouselActionsTypes from '../types/carouselActionsTypes';

const loadingReducer = (state = true, { type }) => {
  switch (type) {
    case newsActionsTypes.FETCH_START:
    case carouselActionsTypes.FETCH_START:
      return true;
    case newsActionsTypes.FETCH_SUCCESS_NEWS_LIST:
    case newsActionsTypes.FETCH_SUCCESS_DELETE_NEWS_LIST_ITEM:
    case carouselActionsTypes.FETCH_SUCCESS_CAROUSEL_IMAGES_LIST:
    case carouselActionsTypes.FETCHSUCCESS_CAROUSEL_IMAGE_DELETE_ITEM:
    case newsActionsTypes.FETCH_ERROR:
      return false;
    default:
      return state;
  }
};

export default loadingReducer;
