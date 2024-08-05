import { createSlice, isFulfilled, isPending, isRejected, PayloadAction } from '@reduxjs/toolkit';
import { Review, Reviews } from '../../../types/reviews.ts';
import { addCommentAction, fetchOfferAction } from '../../api-actions.ts';
import { RequestStatus } from '../../../const.ts';
import { OfferDetails } from '../../../types/offers.ts';

type InitialState = {
  comments: Reviews;
  requestStatus: RequestStatus;
};

const initialState: InitialState = {
  comments: [],
  requestStatus: RequestStatus.Idle,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOfferAction.fulfilled, (state, action: PayloadAction<OfferDetails>) => {
        state.comments = action.payload.comments;
      })
      .addCase(addCommentAction.fulfilled, (state, action: PayloadAction<Review>) => {
        state.comments.push(action.payload);
      })
      .addMatcher(isPending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addMatcher(isFulfilled, (state) => {
        state.requestStatus = RequestStatus.Success;
      })
      .addMatcher(isRejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      });
  },
});
export default commentsSlice;
