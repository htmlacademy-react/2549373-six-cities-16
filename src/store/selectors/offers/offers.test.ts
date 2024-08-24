import { RequestStatus } from '../../../const';
import { makeFakeState } from '../../../utils/moks';
import { isOffersDataLoadingSelector, getCityName, getSortOption } from './offers';
import offersSlice from '../../slices/offers/offers';

describe('Selectors: offers', () => {
  const mockState = makeFakeState();

  it('should return true if request status is Loading', () => {
    mockState[offersSlice.name].requestStatus = RequestStatus.Loading;
    const result = isOffersDataLoadingSelector(mockState);
    expect(result).toBe(true);
  });

  it('should return the correct city name', () => {
    const result = getCityName(mockState);
    expect(result).toBe(mockState[offersSlice.name].cityName.name);
  });

  it('should return the correct sort option', () => {
    const result = getSortOption(mockState);
    expect(result).toBe(mockState[offersSlice.name].sortOption);
  });
});
