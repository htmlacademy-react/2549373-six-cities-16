import { Provider } from 'react-redux';
import { SortOptionValue } from '../../const';
import useSortedCityOffers from './use-sorted-city-offers';
import { generateMockOfferType, makeFakeState, mockStore } from '../../utils/moks';
import { renderHook } from '@testing-library/react';

describe('useSortedCityOffers', () => {
  it('should return sorted offers for a specific city', () => {
    const parisOffer1 = generateMockOfferType();
    const parisOffer2 = generateMockOfferType();
    const amsterdamOffer = generateMockOfferType();

    parisOffer1.city.name = 'Paris';
    parisOffer1.price = 200;
    parisOffer2.city.name = 'Paris';
    parisOffer2.price = 100;
    amsterdamOffer.city.name = 'Amsterdam';
    amsterdamOffer.price = 150;

    const state = makeFakeState();
    state.offers.offers = [parisOffer1, parisOffer2, amsterdamOffer];
    state.offers.sortOption = SortOptionValue.PriceLowToHigh;

    const store = mockStore(state);

    const { result } = renderHook(() => useSortedCityOffers('Paris'), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current).toEqual([parisOffer2, parisOffer1]);
  });

  it('should return an empty array when no offers are available for the specified city', () => {
    const amsterdamOffer = generateMockOfferType();
    amsterdamOffer.city.name = 'Amsterdam';

    const state = makeFakeState();
    state.offers.offers = [amsterdamOffer];
    state.offers.sortOption = SortOptionValue.PriceLowToHigh;

    const store = mockStore(state);

    const { result } = renderHook(() => useSortedCityOffers('Paris'), {
      wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    });

    expect(result.current).toEqual([]);
  });
});
