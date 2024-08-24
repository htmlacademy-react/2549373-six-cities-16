import { State } from '../../../types/state';
import { RequestStatus } from '../../../const';
import { CityName } from '../../../types/city';

export const isOffersDataLoadingSelector = (state: State) => state.offers.requestStatus === RequestStatus.Loading;
export const getCityName = (state: State): CityName => state.offers.cityName.name;
export const getSortOption = (state: State) => state.offers.sortOption;
