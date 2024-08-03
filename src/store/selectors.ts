import { State } from '../types/state.ts';

export const authorizationStatusSelector = (state: State) => state.authorizationStatus;
export const isOffersDataLoadingSelector = (state: State) => state.isOffersDataLoading;
