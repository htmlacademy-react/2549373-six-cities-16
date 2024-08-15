import { createSlice, isPending, isRejected, isFulfilled, PayloadAction } from '@reduxjs/toolkit';
import { Review, Reviews } from '../../../types/reviews.ts';
import { addCommentAction, fetchOfferAction } from '../../api-actions.ts';
import { RequestStatus } from '../../../const.ts';
import { OfferDetails } from '../../../types/offers.ts';
import { setFailed, setLoading, setSuccess } from '../../utils/utils.ts';

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
      .addMatcher(isPending(fetchOfferAction, addCommentAction), setLoading)
      .addMatcher(isFulfilled(fetchOfferAction, addCommentAction), setSuccess)
      .addMatcher(isRejected(fetchOfferAction, addCommentAction), setFailed);
  },
});

export default commentsSlice;
