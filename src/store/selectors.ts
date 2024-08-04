import { createSelector } from '@reduxjs/toolkit';
import { State } from '../types/state.ts';
import { Nullable } from '../types/globals.ts';
import { FullOffer, Offers } from '../types/offers.ts';
import { Reviews } from '../types/reviews.ts';

export const authorizationStatusSelector = (state: State) => state.authorizationStatus;
export const isOffersDataLoadingSelector = (state: State) => state.isOffersDataLoading;

export const getOffer = (state: State) => state.offer;
export const getNearby = (state: State) => state.nearby;
export const getComments = (state: State) => state.comments;

export const getDataOffer = createSelector(
  [getOffer, getNearby, getComments],
  (offer, nearby, comments): [Nullable<FullOffer>, Nullable<Offers>, Reviews] => [offer, nearby, comments]
);
