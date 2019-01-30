import carouselActionsTypes from '../types/carouselActionsTypes';

const FETCH_START = () => ({
  type: carouselActionsTypes.FETCH_START,
});

const FETCH_SUCCESS_CAROUSEL_IMAGES_LIST = carouselList => ({
  type: carouselActionsTypes.FETCH_SUCCESS_CAROUSEL_IMAGES_LIST,
  payload: carouselList,
});

const FETCHSUCCESS_CAROUSEL_IMAGE_DELETE_ITEM = id => ({
  type: carouselActionsTypes.FETCHSUCCESS_CAROUSEL_IMAGE_DELETE_ITEM,
  payload: id,
});

const FETCH_ADD_SUCCESS_CAROUSEL_IMAGE_ITEM = item => ({
  type: carouselActionsTypes.FETCH_ADD_SUCCESS_CAROUSEL_IMAGE_ITEM,
  payload: item,
});

export default {
  FETCH_START,
  FETCH_SUCCESS_CAROUSEL_IMAGES_LIST,
  FETCHSUCCESS_CAROUSEL_IMAGE_DELETE_ITEM,
  FETCH_ADD_SUCCESS_CAROUSEL_IMAGE_ITEM,
};
