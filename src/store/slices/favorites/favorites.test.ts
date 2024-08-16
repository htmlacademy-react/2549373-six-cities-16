import { describe, it, expect } from 'vitest';
import favoritesSlice from './favorites';
import { Offers } from '../../../types/offers.ts';
import {
  generateMockOffers,
  generateMockOfferType,
  makeFakeStore,
  mockFavoriteStatusFalse,
  mockFavoriteStatusTrue
} from '../../../utils/moks.ts';
import { fetchFavoritesAction, toggleFavoriteStatusAction } from '../../async-thunk/favorites/favorites.ts';

describe('Favorites slice', () => {
  const prevState = makeFakeStore()[favoritesSlice.name];

  it('should update favorites when fetchFavoritesAction is fulfilled', () => {
    const mockFavorites: Offers = generateMockOffers(3);
    const state = favoritesSlice.reducer(prevState, fetchFavoritesAction.fulfilled(mockFavorites, '_', undefined));
    expect(state.favorites).toEqual(mockFavorites);
  });

  it('should add offer to favorites when toggleFavoriteStatusAction is fulfilled and isFavorite is true', () => {
    const mockOffer = generateMockOfferType();
    mockOffer.isFavorite = true;
    const state = favoritesSlice.reducer(prevState, toggleFavoriteStatusAction.fulfilled(mockOffer, '_', mockFavoriteStatusTrue(mockOffer.id)));
    expect(state.favorites).toContainEqual(mockOffer);
  });

  it('should remove offer from favorites when toggleFavoriteStatusAction is fulfilled and isFavorite is false', () => {
    const mockOffer = generateMockOfferType();
    mockOffer.isFavorite = false;

    const stateWithOffer = {
      ...prevState,
      favorites: [mockOffer],
    };

    const state = favoritesSlice.reducer(stateWithOffer, toggleFavoriteStatusAction.fulfilled(mockOffer, '_', mockFavoriteStatusFalse(mockOffer.id)));
    expect(state.favorites).not.toContainEqual(mockOffer);
  });
});
