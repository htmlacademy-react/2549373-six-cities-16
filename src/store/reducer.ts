// src/store/reducer.ts
import { Offers } from '../types/offers.ts';
import { CityName } from '../types/city.ts';
import { Cities, SortOptionValue } from '../const.ts';
import { createReducer } from '@reduxjs/toolkit';
import { changeCity, setOffers, setSortOption } from './action.ts';
import { SortOptionValueType } from '../types/sort.ts';

type InitialState = {
  cityName: CityName;
  offers: Offers;
  sortOption: SortOptionValueType;
};

const initialState: InitialState = {
  cityName: Cities.Paris,
  offers: [],
  sortOption: SortOptionValue.Popular,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.cityName = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setSortOption, (state, action) => {
      state.sortOption = action.payload;
    });
});

export { reducer };
