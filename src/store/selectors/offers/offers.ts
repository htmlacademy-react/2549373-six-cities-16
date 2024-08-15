import { State } from '../../../types/state.ts';
import { RequestStatus } from '../../../const.ts';
import { CityName } from '../../../types/city.ts';

export const isOffersDataLoadingSelector = (state: State) => state.offers.requestStatus === RequestStatus.Loading;
export const getCityName = (state: State): CityName => state.offers.cityName.name;
export const getSortOption = (state: State) => state.offers.sortOption;
