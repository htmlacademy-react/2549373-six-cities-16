import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FullOffer, OfferDetails, Offers } from '../../../types/offers';
import { Nullable } from '../../../types/globals';
import { NOT_FOUND_ERROR, RequestStatus } from '../../../const';
import { fetchOfferAction } from '../../api-actions';

type OfferState = {
  offer: Nullable<FullOffer>;
  nearby: Nullable<Offers>;
  requestStatus: RequestStatus;
  errorMessage: Nullable<string>;
};

const initialState: OfferState = {
  offer: null,
  nearby: null,
  requestStatus: RequestStatus.Idle,
  errorMessage: null,
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
      .addCase(fetchOfferAction.fulfilled, (state, action: PayloadAction<OfferDetails>) => {
        state.offer = action.payload.offer;
        state.nearby = action.payload.nearby;
        state.requestStatus = RequestStatus.Success;
        state.errorMessage = null;
      })
      .addCase(fetchOfferAction.rejected, (state, action) => {
        state.requestStatus = RequestStatus.Failed;
        if (action.payload === NOT_FOUND_ERROR) {
          state.errorMessage = NOT_FOUND_ERROR;
        }
      })
      .addCase(fetchOfferAction.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
        state.errorMessage = null;
      });
  },
});
export const {resetErrorMessage} = offerSlice.actions;
export default offerSlice;
