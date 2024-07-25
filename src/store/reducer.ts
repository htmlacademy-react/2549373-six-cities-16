import {Offers} from '../types/offers.ts';
import {CityName} from '../types/city.ts';
import {Cities} from '../const.ts';
import {createReducer} from '@reduxjs/toolkit';
import {changeCity, setOffers} from './action.ts';

type InitialState = {
  cityName: CityName;
  offers: Offers;
}

const initialState: InitialState = {
  cityName: Cities.Paris,
  offers: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.cityName = action.payload;
    })
    .addCase(setOffers, (state, action) => {
      state.offers = action.payload;
    });
});

export {reducer};
