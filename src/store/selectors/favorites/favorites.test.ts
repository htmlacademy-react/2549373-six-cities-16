import { getCountFavorites, getFavorites } from './favorites';
import { makeFakeState, getFixedFavoriteOffers } from '../../../utils/moks';
import favoritesSlice from '../../slices/favorites/favorites';

describe('Selectors: favorites', () => {
  it('should return the correct count of favorite offers', () => {
    const mockFavorites = getFixedFavoriteOffers(5);
    const mockState = makeFakeState();
    mockState[favoritesSlice.name].favorites = mockFavorites;
    const result = getCountFavorites(mockState);
    expect(result).toBe(5);
  });

  it('should return the correct list of favorite offers', () => {
    const mockFavorites = getFixedFavoriteOffers(3);
    const mockState = makeFakeState();
    mockState[favoritesSlice.name].favorites = mockFavorites;
    const result = getFavorites(mockState);
    expect(result).toEqual(mockFavorites);
  });

  it('should return an empty list if there are no favorite offers', () => {
    const mockState = makeFakeState();
    mockState[favoritesSlice.name].favorites = [];
    const result = getFavorites(mockState);
    expect(result).toEqual([]);
  });
});
