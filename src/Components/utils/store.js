import { configureStore } from '@reduxjs/toolkit';
import moviesSlice from './moviesSlice';
import authSlice from './authSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
import movieByIdSlice from './movieByIdSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const reducer = combineReducers({
  movie: moviesSlice,
  auth: persistReducer(persistConfig, authSlice),
  movieid: movieByIdSlice,
});

const store = configureStore({
  reducer: reducer,
});

export default store;
