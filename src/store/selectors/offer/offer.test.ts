import { makeFakeState } from '../../../utils/moks';
import {
  getDataOffer,
  getNearby,
  getNearbyPlacesData,
  getOffer,
  getOfferErrorMessage,
  getOfferRequestStatus
} from './offer';
import offerSlice from '../../slices/offer/offer';
import commentsSlice from '../../slices/comments/comments';

describe('Selectors: offer', () => {
  const mockState = makeFakeState();

  it('should return the correct offer', () => {
    const result = getOffer(mockState);
    expect(result).toEqual(mockState[offerSlice.name].offer);
  });

  it('should return the correct nearby offers', () => {
    const result = getNearby(mockState);
    expect(result).toEqual(mockState[offerSlice.name].nearby);
  });

  it('should return the correct offer request status', () => {
    const result = getOfferRequestStatus(mockState);
    expect(result).toBe(mockState[offerSlice.name].requestStatus);
  });

  it('should return the correct offer error message', () => {
    const result = getOfferErrorMessage(mockState);
    expect(result).toBe(mockState[offerSlice.name].errorMessage);
  });

  it('should return the correct data offer object', () => {
    const result = getDataOffer(mockState);

    const expectedData = {
      offer: mockState[offerSlice.name].offer,
      comments: [...mockState[commentsSlice.name].comments]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
      requestStatus: mockState[offerSlice.name].requestStatus,
      errorMessage: mockState[offerSlice.name].errorMessage,
    };

    expect(result).toEqual(expectedData);
  });

  it('should return filtered nearby offers excluding the current offer', () => {
    const result = getNearbyPlacesData(mockState);

    const expected = [...mockState[offerSlice.name].nearby ?? []]
      .filter((nearbyOffer) => nearbyOffer.id !== mockState[offerSlice.name].offer?.id)
      .slice(0, 3);

    expect(result).toEqual(expected);
  });

  it('should return an empty array if nearby offers or current offer are null', () => {
    const mockStateWithoutNearby = makeFakeState();
    mockStateWithoutNearby[offerSlice.name].nearby = null;
    const result = getNearbyPlacesData(mockStateWithoutNearby);
    expect(result).toEqual([]);

    const mockStateWithoutOffer = makeFakeState();
    mockStateWithoutOffer[offerSlice.name].offer = null;
    const resultWithoutOffer = getNearbyPlacesData(mockStateWithoutOffer);
    expect(resultWithoutOffer).toEqual([]);
  });
});
