import { addCommentAction } from './comments';
import { Endpoint, RouteParams } from '../../../const';
import {
  extractActionsTypes,
  generateMockReview,
  makeFakeStore,
  mockAxiosAdapter,
  mockStore
} from '../../../utils/moks';
import { Review } from '../../../types/reviews';

describe('Comments async actions', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore(makeFakeStore());
  });

  it('should dispatch "addCommentAction.pending" and "addCommentAction.fulfilled" when server response is 200', async () => {
    const mockReview: Review = generateMockReview();

    mockAxiosAdapter.onPost(`${Endpoint.Comments.replace(RouteParams.OfferId, mockReview.id)}`).reply(200, mockReview);
    await store.dispatch(addCommentAction({
      id: mockReview.id,
      dataComment: { comment: mockReview.comment, rating: mockReview.rating }
    }));
    const actions = extractActionsTypes(store.getActions());

    expect(actions).toEqual([
      addCommentAction.pending.type,
      addCommentAction.fulfilled.type,
    ]);
  });

  it('should dispatch "addCommentAction.pending" and "addCommentAction.rejected" when server response is 400', async () => {
    mockAxiosAdapter.onPost(`${Endpoint.Comments.replace(RouteParams.OfferId, '1')}`).reply(400);
    const mockReview: Review = generateMockReview();

    await store.dispatch(addCommentAction({
      id: mockReview.id,
      dataComment: { comment: mockReview.comment, rating: mockReview.rating }
    }));
    const actions = extractActionsTypes(store.getActions());

    expect(actions).toEqual([
      addCommentAction.pending.type,
      addCommentAction.rejected.type,
    ]);
  });
});
