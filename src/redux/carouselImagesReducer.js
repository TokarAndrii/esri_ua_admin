import carouselActionsTypes from './carouselActionsTypes';

const carouselImagesReducer = (state = [], { type, payload }) => {
  switch (type) {
    case carouselActionsTypes.FETCH_SUCCESS_CAROUSEL_IMAGES_LIST:
      return payload;
    case carouselActionsTypes.FETCHSUCCESS_CAROUSEL_IMAGE_DELETE_ITEM:
      return state.filter(currImage => currImage.id !== payload);

    case carouselActionsTypes.FETCH_ADD_SUCCESS_CAROUSEL_IMAGE_ITEM:
      return [...state, payload];
    default:
      return state;
  }
};

export default carouselImagesReducer;
