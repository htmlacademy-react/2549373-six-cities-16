import { FullOffer, Offers } from '../types/offers.ts';
import { CityName } from '../types/city.ts';
import { AuthStatus, Cities, SortOptionValue } from '../const.ts';
import { createReducer } from '@reduxjs/toolkit';
import {
  changeCity,
  loadComments,
  loadNearby,
  loadOffer,
  loadOffers,
  requireAuthorization,
  setOffersDataLoadingStatus,
  setSortOption
} from './action.ts';
import { SortOptionValueType } from '../types/sort.ts';
import { Nullable } from '../types/globals.ts';
import { Reviews } from '../types/reviews.ts';

type InitialState = {
  cityName: CityName;
  offers: Offers;
  offer: Nullable<FullOffer>;
  comments: Reviews;
  nearby: Nullable<Offers>;
  sortOption: SortOptionValueType;
  authorizationStatus: AuthStatus;
  isOffersDataLoading: boolean;
};

const initialState: InitialState = {
  cityName: Cities.Paris,
  offers: [],
  offer: null,
  comments: [],
  nearby: null,
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
    .addCase(loadOffer, (state, action) => {
      state.offer = action.payload;
    })
    .addCase(loadNearby, (state, action) => {
      state.nearby = action.payload;
    })
    .addCase(loadComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});

export { reducer };
