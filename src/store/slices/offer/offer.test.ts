import { describe, expect, it } from 'vitest';
import offerSlice, { resetErrorMessage } from './offer';
import { NOT_FOUND_ERROR, RequestStatus } from '../../../const';
import {
  generateMockFullOffer,
  generateMockOfferDetails,
  generateMockOfferType,
  makeFakeStore
} from '../../../utils/moks';
import { OfferDetails, OfferType } from '../../../types/offers';
import { fetchOfferAction } from '../../async-thunk/offer/offer';
import { toggleFavoriteStatusAction } from '../../async-thunk/favorites/favorites';

describe('Offer slice', () => {
  const prevState = makeFakeStore()[offerSlice.name];

  it('should set loading state when fetchOfferAction is pending', () => {
    const state = offerSlice.reducer(prevState, fetchOfferAction.pending);
    expect(state.requestStatus).toBe(RequestStatus.Loading);
  });

  it('should update offer and nearby offers when fetchOfferAction is fulfilled', () => {
    const mockOfferDetails: OfferDetails = generateMockOfferDetails();
    const state = offerSlice.reducer(prevState, fetchOfferAction.fulfilled(mockOfferDetails, '', mockOfferDetails.offer.id));
    expect(state.offer).toEqual(mockOfferDetails.offer);
    expect(state.nearby).toEqual(mockOfferDetails.nearby);
    expect(state.requestStatus).toBe(RequestStatus.Success);
  });

  it('should set error message when fetchOfferAction is rejected with NOT_FOUND_ERROR', () => {
    const action = {
      type: fetchOfferAction.rejected.type,
      payload: NOT_FOUND_ERROR,
      meta: {
        rejectedWithValue: true,
      },
    };
    const state = offerSlice.reducer(prevState, action);
    expect(state.requestStatus).toBe(RequestStatus.Failed);
    expect(state.errorMessage).toBe(NOT_FOUND_ERROR);
  });

  it('should reset error message when resetErrorMessage is dispatched', () => {
    const state = offerSlice.reducer(prevState, resetErrorMessage());
    expect(state.errorMessage).toBeNull();
    expect(state.requestStatus).toBe(RequestStatus.Idle);
  });

  it('should update isFavorite status of the offer when toggleFavoriteStatusAction is fulfilled', () => {
    const mockOffer: OfferType = generateMockOfferType();
    mockOffer.isFavorite = true;

    const stateWithOffer = {
      ...prevState,
      offer: {
        ...generateMockFullOffer(),
        ...mockOffer
      },
    };

    const state = offerSlice.reducer(stateWithOffer, toggleFavoriteStatusAction.fulfilled(mockOffer, '', {
      id: mockOffer.id,
      status: 1
    }));

    expect(state.offer?.isFavorite).toBe(true);
  });
});
