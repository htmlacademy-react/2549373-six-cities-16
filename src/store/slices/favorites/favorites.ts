import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Offers, OfferType } from '../../../types/offers';
import { fetchFavoritesAction, toggleFavoriteStatusAction } from '../../async-thunk/favorites/favorites';

export type FavoritesInitialState = {
  favorites: Offers;
}

const initialState: FavoritesInitialState = {
  favorites: [],
};

const handleFetchFavoritesFulfilled = (state: FavoritesInitialState, action: PayloadAction<Offers>) => {
  state.favorites = action.payload;
};

const handleToggleFavoriteFulfilled = (state: FavoritesInitialState, action: PayloadAction<OfferType>) => {
  const updatedOffer = action.payload;

  if (updatedOffer.isFavorite) {
    state.favorites.push(updatedOffer);
  } else {
    state.favorites = state.favorites.filter((offer) => offer.id !== updatedOffer.id);
  }
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoritesAction.fulfilled, handleFetchFavoritesFulfilled)
      .addCase(toggleFavoriteStatusAction.fulfilled, handleToggleFavoriteFulfilled);
  },
});

export default favoritesSlice;
