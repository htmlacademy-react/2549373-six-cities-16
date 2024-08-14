import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../services/api.ts';
import offersSlice from './slices/offers/offers.ts';
import commentsSlice from './slices/comments/comments.ts';
import authSlice from './slices/auth/auth.ts';
import offerSlice from './slices/offer/offer.ts';

export const api = createAPI();

export const reducer = combineReducers({
  [offersSlice.name]: offersSlice.reducer,
  [offerSlice.name]: offerSlice.reducer,
  [commentsSlice.name]: commentsSlice.reducer,
  [authSlice.name]: authSlice.reducer,
});

export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: { extraArgument: api }}),
  reducer,
});
