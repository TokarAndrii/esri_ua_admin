import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import loadingReducer from './loadingReducer';
import newsListReducer from './newsListReducer';
import carouselImagesReducer from './carouselImagesReducer';
import sessionReducer from './sessionReducer';

const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: ['newsList', 'isLoading', 'carouselImages', ''],
};

const sessionPersistConfig = {
  key: 'session',
  storage,
  whitelist: ['authToken'],
};

const rootReducer = combineReducers({
  newsList: newsListReducer,
  isLoading: loadingReducer,
  carouselImages: carouselImagesReducer,
  session: persistReducer(sessionPersistConfig, sessionReducer),
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export default persistedReducer;
