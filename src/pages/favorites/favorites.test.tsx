import { render, screen, waitFor } from '@testing-library/react';
import Favorites from './favorites';
import { extractActionsTypes, getFixedFavoriteOffers, makeFakeStore } from '../../utils/moks';
import { withHistory, withStore } from '../../utils/mock-component';
import { Endpoint } from '../../const';
import { fetchFavoritesAction } from '../../store/async-thunk/favorites/favorites';
import favoritesSlice from '../../store/slices/favorites/favorites';

describe('Component: Favorites', () => {
  it('should dispatch fetchFavoritesAction', async () => {
    const mockOffers = getFixedFavoriteOffers(3);
    const withHistoryComponent = withHistory(<Favorites />);
    const { withStoreComponent, mockAxiosAdapter, mockStore } = withStore(withHistoryComponent, makeFakeStore());

    mockAxiosAdapter.onGet(Endpoint.Favorites).reply(200, mockOffers);

    render(withStoreComponent);

    await waitFor(() => {
      const actions = extractActionsTypes(mockStore.getActions());
      expect(actions).toContain(fetchFavoritesAction.fulfilled.type);
    });
  });

  it('should render empty state when no favorites', () => {
    const withHistoryComponent = withHistory(<Favorites />);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());

    render(withStoreComponent);

    expect(screen.getByText('Favorites (empty)')).toBeInTheDocument();
  });

  it('should render saved listing when favorite offers exist', () => {
    const mockOffers = getFixedFavoriteOffers(3);
    const withHistoryComponent = withHistory(<Favorites />);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      [favoritesSlice.name]: {
        favorites: mockOffers,
      },
    }));

    render(withStoreComponent);

    expect(screen.getByText('Saved listing')).toBeInTheDocument();
  });
});
