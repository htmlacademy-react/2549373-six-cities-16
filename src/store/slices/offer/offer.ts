import { createSlice, PayloadAction, isPending, isRejected, isFulfilled } from '@reduxjs/toolkit';
import { FullOffer, OfferDetails, Offers, OfferType } from '../../../types/offers';
import { Nullable } from '../../../types/globals';
import { NOT_FOUND_ERROR, RequestStatus } from '../../../const';
import { setLoading } from '../../utils/utils';
import { fetchOfferAction } from '../../async-thunk/offer/offer';
import { toggleFavoriteStatusAction } from '../../async-thunk/favorites/favorites';

export type OfferInitialState = {
  offer: Nullable<FullOffer>;
  nearby: Nullable<Offers>;
  requestStatus: RequestStatus;
  errorMessage: Nullable<string>;
};

const initialState: OfferInitialState = {
  offer: null,
  nearby: null,
  requestStatus: RequestStatus.Idle,
  errorMessage: null,
};

const handleFetchOfferFulfilled = (state: OfferInitialState, action: PayloadAction<OfferDetails>) => {
  state.offer = action.payload.offer;
  state.nearby = action.payload.nearby;
  state.requestStatus = RequestStatus.Success;
  state.errorMessage = null;
};

const handleFetchOfferRejected = (state: OfferInitialState, action: PayloadAction<string | undefined>) => {
  state.requestStatus = RequestStatus.Failed;
  if (action.payload && action.payload === NOT_FOUND_ERROR) {
    state.errorMessage = NOT_FOUND_ERROR;
  }
};

const handleToggleFavoriteFulfilled = (state: OfferInitialState, action: PayloadAction<OfferType | FullOffer>) => {
  if (state.offer && state.offer.id === action.payload.id) {
    state.offer.isFavorite = action.payload.isFavorite;
  }
};

const offerSlice = createSlice({
  name: 'offer',
  initialState,
  reducers: {
    resetErrorMessage: (state) => {
      state.errorMessage = null;
      state.requestStatus = RequestStatus.Idle;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending(fetchOfferAction), setLoading)
      .addMatcher(isFulfilled(fetchOfferAction), handleFetchOfferFulfilled)
      .addMatcher(isRejected(fetchOfferAction), handleFetchOfferRejected)
      .addMatcher(isFulfilled(toggleFavoriteStatusAction), handleToggleFavoriteFulfilled);
  },
});

export const { resetErrorMessage } = offerSlice.actions;
export default offerSlice;
