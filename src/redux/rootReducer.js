import { combineReducers } from 'redux';
import loadingReducer from './loadingReducer';
import newsListReducer from './newsListReducer';
import carouselImagesReducer from './carouselImagesReducer';

export default combineReducers({
  newsList: newsListReducer,
  isLoading: loadingReducer,
  carouselImages: carouselImagesReducer,
  // isError: errorReducer,
});
