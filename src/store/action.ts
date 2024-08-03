import { createAction } from '@reduxjs/toolkit';
import { CityName } from '../types/city.ts';
import { Offers } from '../types/offers.ts';
import { SortOptionValueType } from '../types/sort.ts';
import { AppRoute, AuthStatus } from '../const.ts';

export const changeCity = createAction<CityName>('offer/changeCity');
export const setSortOption = createAction<SortOptionValueType>('offer/setSortOption');
export const loadOffers = createAction<Offers>('data/loadQuestions');
export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

export const requireAuthorization = createAction<AuthStatus>('user/requireAuthorization');
export const redirectToRoute = createAction<AppRoute>('offer/redirectToRoute');
