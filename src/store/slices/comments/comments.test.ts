import { describe, it, expect } from 'vitest';
import commentsSlice from './comments';
import { RequestStatus } from '../../../const';
import { generateMockOfferDetails, generateMockReview, makeFakeStore } from '../../../utils/moks';
import { fetchOfferAction } from '../../async-thunk/offer/offer';
import { addCommentAction } from '../../async-thunk/comments/comments';

describe('Comments slice', () => {
  const prevState = makeFakeStore()[commentsSlice.name];

  it('should set loading state when fetchOfferAction or addCommentAction is pending', () => {
    const state = commentsSlice.reducer(prevState, fetchOfferAction.pending);
    expect(state.requestStatus).toBe(RequestStatus.Loading);
  });

  it('should update comments when fetchOfferAction is fulfilled', () => {
    const mockOfferDetails = generateMockOfferDetails();
    const state = commentsSlice.reducer(prevState, fetchOfferAction.fulfilled(mockOfferDetails, '_', '_'));
    expect(state.comments).toEqual(mockOfferDetails.comments);
    expect(state.requestStatus).toBe(RequestStatus.Success);
  });

  it('should add comment when addCommentAction is fulfilled', () => {
    const mockComment = generateMockReview();
    const dataComment = { id: '1', dataComment: { comment: 'Test', rating: 5 } };
    const state = commentsSlice.reducer(prevState, addCommentAction.fulfilled(mockComment, '_', dataComment));
    expect(state.comments).toContainEqual(mockComment);
    expect(state.requestStatus).toBe(RequestStatus.Success);
  });

  it('should set failed state when fetchOfferAction or addCommentAction is rejected', () => {
    const state = commentsSlice.reducer(prevState, fetchOfferAction.rejected);
    expect(state.requestStatus).toBe(RequestStatus.Failed);
  });
});
