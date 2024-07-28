import { createAction } from '@reduxjs/toolkit';
import { CityName } from '../types/city.ts';
import { Offers } from '../types/offers.ts';
import { SortOptionValueType } from '../types/sort.ts';

export const changeCity = createAction<CityName>('offer/changeCity');
export const setOffers = createAction<Offers>('offer/setOffers');
export const setSortOption = createAction<SortOptionValueType>('offer/setSortOption');
