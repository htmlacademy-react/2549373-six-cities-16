import { render, screen } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import App from './app';
import { AppRoute, AuthStatus, RequestStatus, RouteParams } from '../../const';
import { withHistory, withStore } from '../../utils/mock-component';
import { generateMockOfferDetails, getRandomFavoriteOffers, makeFakeStore } from '../../utils/moks.ts';
import authSlice, { AuthInitialState } from '../../store/slices/auth/auth.ts';
import favoritesSlice from '../../store/slices/favorites/favorites.ts';
import offerSlice, { OfferInitialState } from '../../store/slices/offer/offer.ts';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render "Main" when user navigate to "/"', () => {
    const withHistoryComponent = withHistory(<App/>, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      [authSlice.name]: { authorizationStatus: AuthStatus.NoAuth } as AuthInitialState
    }));
    mockHistory.push(AppRoute.Root);

    render(withStoreComponent);

    expect(screen.getByText(/Cities/i)).toBeInTheDocument(); // Замените на текст, который точно присутствует на главной странице
  });

  it('should render "Login" when user navigate to "/login"', () => {
    const withHistoryComponent = withHistory(<App/>, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      [authSlice.name]: { authorizationStatus: AuthStatus.NoAuth } as AuthInitialState
    }));
    mockHistory.push(AppRoute.Login);

    render(withStoreComponent);

    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it('should render "Saved listing" when user has favorite listings', () => {
    const favoriteOffers = getRandomFavoriteOffers(5);

    const withHistoryComponent = withHistory(<App/>, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      [authSlice.name]: { authorizationStatus: AuthStatus.Auth } as AuthInitialState,
      [favoritesSlice.name]: { favorites: favoriteOffers },
    }));
    mockHistory.push(AppRoute.Favorites);

    render(withStoreComponent);

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
  });

  it('should render "Favorites (empty)" when user has no favorite listings', () => {
    const withHistoryComponent = withHistory(<App/>, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      [authSlice.name]: { authorizationStatus: AuthStatus.Auth } as AuthInitialState,
      [favoritesSlice.name]: { favorites: [] },
    }));
    mockHistory.push(AppRoute.Favorites);

    render(withStoreComponent);

    expect(screen.getByText(/Favorites \(empty\)/i)).toBeInTheDocument();
  });

  it('should render "NotFound" when user navigate to non-existent route', () => {
    const withHistoryComponent = withHistory(<App/>, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      [authSlice.name]: { authorizationStatus: AuthStatus.NoAuth } as AuthInitialState
    }));
    mockHistory.push('/unknown-route');

    render(withStoreComponent);

    expect(screen.getByText(/404/i)).toBeInTheDocument();
    expect(screen.getByText(/Oops! Page not found/i)).toBeInTheDocument();
    expect(screen.getByText(/Go to Homepage/i)).toBeInTheDocument();
  });

  it('should render "Offer" when user navigate to "/offer/:id"', () => {
    const mockOffer = generateMockOfferDetails();
    const withHistoryComponent = withHistory(<App/>, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      [authSlice.name]: { authorizationStatus: AuthStatus.NoAuth } as AuthInitialState,
      [offerSlice.name]: {
        offer: mockOffer.offer,
        nearby: mockOffer.nearby,
        errorMessage: null,
        requestStatus: RequestStatus.Success
      } as OfferInitialState,
    }));

    mockHistory.push(AppRoute.Offer.replace(RouteParams.Id, mockOffer.offer.id));
    render(withStoreComponent);

    expect(screen.getByTestId('offer')).toBeInTheDocument();
  });
});
