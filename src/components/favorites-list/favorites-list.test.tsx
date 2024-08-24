import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import { generateMockOfferType, makeFakeStore } from '../../utils/moks';
import FavoritesList from './favorites-list';
import { createMemoryHistory } from 'history';
import { AuthStatus } from '../../const';
import authSlice, { AuthInitialState } from '../../store/slices/auth/auth';
import favoritesSlice, { FavoritesInitialState } from '../../store/slices/favorites/favorites';

describe('Component: FavoritesList', () => {
  const mockHistory = createMemoryHistory();

  it('should render "FavoritesList" correctly with grouped offers', () => {
    const mockOfferParis = generateMockOfferType();
    const mockOfferCologne = generateMockOfferType();
    mockOfferParis.city.name = 'Paris';
    mockOfferCologne.city.name = 'Cologne';

    const withHistoryComponent = withHistory(<FavoritesList/>, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        [authSlice.name]: { authorizationStatus: AuthStatus.Auth } as AuthInitialState,
        [favoritesSlice.name]: { favorites: [mockOfferParis, mockOfferCologne] } as FavoritesInitialState,
      })
    );

    render(withStoreComponent);

    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Cologne')).toBeInTheDocument();
    expect(screen.getAllByRole('article').length).toBe(2);
  });

  it('should render "FavoritesList" with empty state when no offers', () => {
    const withHistoryComponent = withHistory(<FavoritesList/>, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        [authSlice.name]: { authorizationStatus: AuthStatus.Auth } as AuthInitialState,
        [favoritesSlice.name]: { favorites: [] } as FavoritesInitialState,
      })
    );

    render(withStoreComponent);

    expect(screen.queryByRole('article')).not.toBeInTheDocument();
  });
});
