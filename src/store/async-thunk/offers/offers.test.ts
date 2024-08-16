import { fetchOffersAction } from './offers';
import { Endpoint } from '../../../const';
import {
  extractActionsTypes,
  makeFakeStore,
  mockAxiosAdapter,
  mockStore,
  generateMockOffers,
} from '../../../utils/moks.ts';

describe('Offers async actions', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore(makeFakeStore());
  });

  it('should dispatch "fetchOffersAction.pending" and "fetchOffersAction.fulfilled" when server response is 200', async () => {
    const mockOffers = generateMockOffers(5);

    mockAxiosAdapter.onGet(Endpoint.Offers).reply(200, mockOffers);

    await store.dispatch(fetchOffersAction());
    const actions = extractActionsTypes(store.getActions());

    expect(actions).toEqual([
      fetchOffersAction.pending.type,
      fetchOffersAction.fulfilled.type,
    ]);
  });

  it('should dispatch "fetchOffersAction.pending" and "fetchOffersAction.rejected" when server response is 400', async () => {
    mockAxiosAdapter.onGet(Endpoint.Offers).reply(400);

    await store.dispatch(fetchOffersAction());
    const actions = extractActionsTypes(store.getActions());

    expect(actions).toEqual([
      fetchOffersAction.pending.type,
      fetchOffersAction.rejected.type,
    ]);
  });
});
