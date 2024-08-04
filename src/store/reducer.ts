import { Offers } from '../types/offers.ts';
import { CityName } from '../types/city.ts';
import { AuthStatus, Cities, SortOptionValue } from '../const.ts';
import { createReducer } from '@reduxjs/toolkit';
import { changeCity, loadOffers, setOffersDataLoadingStatus, setSortOption } from './action.ts';
import { SortOptionValueType } from '../types/sort.ts';

type InitialState = {
  cityName: CityName;
  offers: Offers;
  sortOption: SortOptionValueType;
  authorizationStatus: AuthStatus;
  isOffersDataLoading: boolean;
};

const initialState: InitialState = {
  cityName: Cities.Paris,
  offers: [],
  sortOption: SortOptionValue.Popular,
  authorizationStatus: AuthStatus.Unknown,
  isOffersDataLoading: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.cityName = action.payload;
    })
    .addCase(setSortOption, (state, action) => {
      state.sortOption = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    });
});

export { reducer };
