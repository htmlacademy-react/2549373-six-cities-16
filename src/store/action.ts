import { createAction } from '@reduxjs/toolkit';
import { CityName } from '../types/city.ts';
import { FullOffer, Offers } from '../types/offers.ts';
import { SortOptionValueType } from '../types/sort.ts';
import { AppRoute, AuthStatus } from '../const.ts';
import { Reviews } from '../types/reviews.ts';

export const changeCity = createAction<CityName>('offer/changeCity');
export const setSortOption = createAction<SortOptionValueType>('offer/setSortOption');
export const loadOffers = createAction<Offers>('data/loadOffers');
export const loadOffer = createAction<FullOffer>('data/loadOffer');
export const loadNearby = createAction<Offers>('data/loadNearby');
export const loadComments = createAction<Reviews>('data/loadComments');
export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

export const requireAuthorization = createAction<AuthStatus>('user/requireAuthorization');
export const redirectToRoute = createAction<AppRoute>('offer/redirectToRoute');
