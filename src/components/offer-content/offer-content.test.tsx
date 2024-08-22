import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { withHistory, withStore } from '../../utils/mock-component';
import OfferContent from './offer-content';
import { generateMockFullOffer, generateMockReviews, makeFakeStore, mockFavoriteStatusTrue } from '../../utils/moks';
import { AppRoute, AuthStatus } from '../../const';
import authSlice, { AuthInitialState } from '../../store/slices/auth/auth';
import { vi } from 'vitest';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { checkIsAuth } from '../../store/selectors/auth/auth';
import { toggleFavoriteStatusAction } from '../../store/async-thunk/favorites/favorites';

vi.mock('../../hooks', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

vi.mock('../../store/async-thunk/favorites/favorites', () => ({
  toggleFavoriteStatusAction: vi.fn().mockReturnValue({ type: 'TOGGLE_FAVORITE_STATUS' }),
}));

describe('Component: OfferContent', () => {
  const mockDispatch = vi.fn();
  const mockHistory = createMemoryHistory();
  const mockOffer = generateMockFullOffer();
  const mockReviews = generateMockReviews(3);

  beforeEach(() => {
    vi.mocked(useAppDispatch).mockReturnValue(mockDispatch);
  });

  it('should correctly render offer content', () => {
    mockHistory.push(`/offer/${mockOffer.id}`);

    const withHistoryComponent = withHistory(<OfferContent offer={mockOffer} reviews={mockReviews}/>, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        [authSlice.name]: { authorizationStatus: AuthStatus.Auth } as AuthInitialState,
      })
    );

    render(withStoreComponent);

    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
    expect(screen.getByText(/What's inside/i)).toBeInTheDocument();

    mockOffer.goods.forEach((good) => {
      expect(screen.getByText(good)).toBeInTheDocument();
    });
  });

  it('should redirect to login page when trying to toggle favorite status if user is not authorized', async () => {
    vi.mocked(useAppSelector).mockImplementation((selector) => {
      if (selector === checkIsAuth) {
        return false;
      }
    });

    mockHistory.push(`/offer/${mockOffer.id}`);

    const withHistoryComponent = withHistory(<OfferContent offer={mockOffer} reviews={mockReviews}/>, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        [authSlice.name]: { authorizationStatus: AuthStatus.NoAuth } as AuthInitialState,
      })
    );

    render(withStoreComponent);

    const favoriteButton = screen.getByTestId('favorite-button');
    await act(async () => {
      await userEvent.click(favoriteButton);
    });

    expect(mockHistory.location.pathname).toBe(AppRoute.Login);
  });

  it('should handle favorite button click when user is authorized', async () => {
    vi.mocked(useAppSelector).mockImplementation((selector) => {
      if (selector === checkIsAuth) {
        return true;
      }
    });

    mockHistory.push(`/offer/${mockOffer.id}`);

    const withHistoryComponent = withHistory(<OfferContent offer={mockOffer} reviews={mockReviews}/>, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        [authSlice.name]: { authorizationStatus: AuthStatus.Auth } as AuthInitialState,
      })
    );

    render(withStoreComponent);

    const favoriteButton = screen.getByTestId('favorite-button');
    await act(async () => {
      await userEvent.click(favoriteButton);
    });

    expect(mockDispatch).toHaveBeenCalledWith(toggleFavoriteStatusAction(mockFavoriteStatusTrue(mockOffer.id)));
  });
});
