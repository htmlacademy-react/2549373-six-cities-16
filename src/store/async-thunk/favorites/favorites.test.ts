import { fetchFavoritesAction, toggleFavoriteStatusAction } from './favorites';
import { Endpoint, RouteParams } from '../../../const';
import {
  extractActionsTypes,
  generateMockOffers, generateMockOfferType,
  makeFakeStore,
  mockAxiosAdapter, mockFavoriteStatusTrue,
  mockStore
} from '../../../utils/moks.ts';
import { Offers } from '../../../types/offers';

describe('Favorites async actions', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore(makeFakeStore());
  });

  it('should dispatch "fetchFavoritesAction.pending" and "fetchFavoritesAction.fulfilled" when server response is 200', async () => {
    const mockFavorites: Offers = generateMockOffers(5);
    mockAxiosAdapter.onGet(Endpoint.Favorites).reply(200, mockFavorites);

    await store.dispatch(fetchFavoritesAction());
    const actions = extractActionsTypes(store.getActions());

    expect(actions).toEqual([
      fetchFavoritesAction.pending.type,
      fetchFavoritesAction.fulfilled.type,
    ]);
  });

  it('should dispatch "fetchFavoritesAction.pending" and "fetchFavoritesAction.rejected" when server response is 400', async () => {
    mockAxiosAdapter.onGet(Endpoint.Favorites).reply(400);

    await store.dispatch(fetchFavoritesAction());
    const actions = extractActionsTypes(store.getActions());

    expect(actions).toEqual([
      fetchFavoritesAction.pending.type,
      fetchFavoritesAction.rejected.type,
    ]);
  });

  it('should dispatch "toggleFavoriteStatusAction.pending" and "toggleFavoriteStatusAction.fulfilled" when server response is 200', async () => {
    const mockOffer = generateMockOfferType();
    mockAxiosAdapter.onPost(`${Endpoint.Favorite.replace(RouteParams.OfferId, mockOffer.id).replace(RouteParams.Status, '1')}`).reply(200, mockOffer);

    await store.dispatch(toggleFavoriteStatusAction(mockFavoriteStatusTrue(mockOffer.id)));
    const actions = extractActionsTypes(store.getActions());

    expect(actions).toEqual([
      toggleFavoriteStatusAction.pending.type,
      toggleFavoriteStatusAction.fulfilled.type,
    ]);
  });

  it('should dispatch "toggleFavoriteStatusAction.pending" and "toggleFavoriteStatusAction.rejected" when server response is 400', async () => {
    const mockOffer = generateMockOfferType();
    mockAxiosAdapter.onPost(`${Endpoint.Favorite.replace(RouteParams.OfferId, mockOffer.id).replace(RouteParams.Status, '1')}`).reply(400);

    await store.dispatch(toggleFavoriteStatusAction(mockFavoriteStatusTrue(mockOffer.id)));
    const actions = extractActionsTypes(store.getActions());

    expect(actions).toEqual([
      toggleFavoriteStatusAction.pending.type,
      toggleFavoriteStatusAction.rejected.type,
    ]);
  });
});
