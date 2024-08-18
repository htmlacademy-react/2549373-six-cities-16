import { fetchOfferAction } from './offer';
import { Endpoint, RouteParams } from '../../../const';
import {
  extractActionsTypes,
  makeFakeStore,
  mockAxiosAdapter,
  mockStore,
  generateMockFullOffer,
  generateMockOffers,
  generateMockReviews,
} from '../../../utils/moks.ts';

describe('Offer async actions', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore(makeFakeStore());
  });

  it('should dispatch "fetchOfferAction.pending" and "fetchOfferAction.fulfilled" when server response is 200', async () => {
    const mockOffer = generateMockFullOffer();
    const mockNearby = generateMockOffers(3);
    const mockComments = generateMockReviews(5);

    mockAxiosAdapter
      .onGet(Endpoint.Offer.replace(RouteParams.Id, '1'))
      .reply(200, mockOffer);

    mockAxiosAdapter
      .onGet(`${Endpoint.Offer.replace(RouteParams.Id, '1')}/nearby`)
      .reply(200, mockNearby);

    mockAxiosAdapter
      .onGet(Endpoint.Comments.replace(RouteParams.OfferId, '1'))
      .reply(200, mockComments);

    await store.dispatch(fetchOfferAction('1'));
    const actions = extractActionsTypes(store.getActions());

    expect(actions).toEqual([
      fetchOfferAction.pending.type,
      fetchOfferAction.fulfilled.type,
    ]);
  });

  it('should dispatch "fetchOfferAction.pending" and "fetchOfferAction.rejected" when server response is 404', async () => {
    mockAxiosAdapter
      .onGet(Endpoint.Offer.replace(RouteParams.Id, '1'))
      .reply(404);

    await store.dispatch(fetchOfferAction('1'));
    const actions = extractActionsTypes(store.getActions());

    expect(actions).toEqual([
      fetchOfferAction.pending.type,
      fetchOfferAction.rejected.type,
    ]);
  });
});
