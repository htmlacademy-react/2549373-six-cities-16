import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import offersSlice from './slices/offers/offers';
import commentsSlice from './slices/comments/comments';
import authSlice from './slices/auth/auth';
import offerSlice from './slices/offer/offer';
import favoritesSlice from './slices/favorites/favorites';

export const api = createAPI();

export const reducer = combineReducers({
  [offersSlice.name]: offersSlice.reducer,
  [offerSlice.name]: offerSlice.reducer,
  [commentsSlice.name]: commentsSlice.reducer,
  [authSlice.name]: authSlice.reducer,
  [favoritesSlice.name]: favoritesSlice.reducer,
});

export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: { extraArgument: api }}),
  reducer,
});
