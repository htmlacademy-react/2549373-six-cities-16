import { describe, it, expect } from 'vitest';
import offersSlice, { changeCity, setSortOption, setCurrentOffer } from './offers';
import { generateMockOffers, generateMockOfferType, makeFakeStore } from '../../../utils/moks';
import { Cities, SortOptionValue, RequestStatus } from '../../../const';
import { Offers, OfferType } from '../../../types/offers';
import { CityLink } from '../../../types/city';
import { fetchOffersAction } from '../../async-thunk/offers/offers';
import { toggleFavoriteStatusAction } from '../../async-thunk/favorites/favorites';

describe('Offers slice', () => {
  const prevState = makeFakeStore()[offersSlice.name];

  it('should change city when changeCity action is dispatched', () => {
    const newCity: CityLink = { id: Cities.Amsterdam.id, name: Cities.Amsterdam.name };
    const state = offersSlice.reducer(prevState, changeCity(newCity));
    expect(state.cityName).toEqual(newCity);
  });

  it('should set sort option when setSortOption action is dispatched', () => {
    const sortOption = SortOptionValue.PriceHighToLow;
    const state = offersSlice.reducer(prevState, setSortOption(sortOption));
    expect(state.sortOption).toBe(sortOption);
  });

  it('should set current offer when setCurrentOffer action is dispatched', () => {
    const mockOffer: OfferType = generateMockOfferType();
    const state = offersSlice.reducer(prevState, setCurrentOffer(mockOffer));
    expect(state.currentOffer).toEqual(mockOffer);
  });

  it('should set loading state when fetchOffersAction is pending', () => {
    const state = offersSlice.reducer(prevState, fetchOffersAction.pending);
    expect(state.requestStatus).toBe(RequestStatus.Loading);
  });

  it('should update offers when fetchOffersAction is fulfilled', () => {
    const mockOffers: Offers = generateMockOffers(3);
    const state = offersSlice.reducer(prevState, fetchOffersAction.fulfilled(mockOffers, 'requestId', undefined));
    expect(state.offers).toEqual(mockOffers);
    expect(state.requestStatus).toBe(RequestStatus.Success);
  });

  it('should update isFavorite status of an offer when toggleFavoriteStatusAction is fulfilled', () => {
    const mockOffer = generateMockOfferType();
    const stateWithOffers = {
      ...prevState,
      offers: [mockOffer],
    };

    const updatedOffer = { ...mockOffer, isFavorite: !mockOffer.isFavorite };
    const state = offersSlice.reducer(stateWithOffers, toggleFavoriteStatusAction.fulfilled(updatedOffer, 'requestId', { id: mockOffer.id, status: 1 }));

    expect(state.offers[0].isFavorite).toBe(!mockOffer.isFavorite);
  });

  it('should set failed state when fetchOffersAction is rejected', () => {
    const state = offersSlice.reducer(prevState, fetchOffersAction.rejected(null, 'requestId', undefined));
    expect(state.requestStatus).toBe(RequestStatus.Failed);
  });
});
