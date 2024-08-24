import { getComments } from './comments';
import { makeFakeState, generateMockReviews } from '../../../utils/moks';
import commentsSlice from '../../slices/comments/comments';

describe('Selectors: comments', () => {
  it('should return a sorted list of comments by date', () => {
    const mockComments = generateMockReviews(3);
    const mockState = makeFakeState();
    mockState[commentsSlice.name].comments = mockComments;
    const result = getComments(mockState);
    expect(result).toEqual([...mockComments].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  });

  it('should return an empty array if there are no comments', () => {
    const mockState = makeFakeState();
    mockState[commentsSlice.name].comments = [];
    const result = getComments(mockState);
    expect(result).toEqual([]);
  });
});
