import { combineReducers } from 'redux';
import loadingReducer from './loadingReducer';
import newsListReducer from './newsListReducer';

export default combineReducers({
  newsList: newsListReducer,
  isLoading: loadingReducer,
});
