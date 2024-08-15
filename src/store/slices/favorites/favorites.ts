import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Offers, OfferType } from '../../../types/offers.ts';
import { fetchFavoritesAction, toggleFavoriteStatusAction } from '../../api-actions.ts';

interface FavoritesState {
  favorites: Offers;
}

const initialState: FavoritesState = {
  favorites: [],
};

const handleFetchFavoritesFulfilled = (state: FavoritesState, action: PayloadAction<Offers>) => {
  state.favorites = action.payload;
};

const handleToggleFavoriteFulfilled = (state: FavoritesState, action: PayloadAction<OfferType>) => {
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
