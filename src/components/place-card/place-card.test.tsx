import { act, fireEvent, render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import PlaceCard from './place-card';
import { generateMockOfferType, makeFakeStore } from '../../utils/moks';
import { AppRoute, AuthStatus, PageType } from '../../const';
import authSlice, { AuthInitialState } from '../../store/slices/auth/auth';
import { setCurrentOffer } from '../../store/slices/offers/offers';
import { toggleFavoriteStatusAction } from '../../store/async-thunk/favorites/favorites';
import { vi } from 'vitest';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { checkIsAuth } from '../../store/selectors/auth/auth';
import userEvent from '@testing-library/user-event';
import * as ReactRouterDom from 'react-router-dom';

vi.mock('../../hooks', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

vi.mock('../../store/async-thunk/favorites/favorites', () => ({
  toggleFavoriteStatusAction: vi.fn().mockReturnValue({ type: 'TOGGLE_FAVORITE_STATUS' }),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof ReactRouterDom>('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('Component: PlaceCard', () => {
  const mockDispatch = vi.fn();
  const mockHistory = createMemoryHistory();
  const mockOffer = generateMockOfferType();
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.mocked(useAppDispatch).mockReturnValue(mockDispatch);
    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
  });

  it('should render the PlaceCard component correctly', () => {
    const withHistoryComponent = withHistory(
      <PlaceCard offer={mockOffer} className={PageType.CITIES} />,
      mockHistory
    );

    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      [authSlice.name]: { authorizationStatus: AuthStatus.Auth } as AuthInitialState,
    }));

    render(withStoreComponent);

    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
    expect(screen.getByText(`€${mockOffer.price}`)).toBeInTheDocument();
    expect(screen.getByAltText('Place image')).toHaveAttribute('src', mockOffer.previewImage);
  });

  it('should dispatch setCurrentOffer when mouse enters and leaves the card', () => {
    const withHistoryComponent = withHistory(
      <PlaceCard offer={mockOffer} className={PageType.CITIES} />,
      mockHistory
    );

    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());

    render(withStoreComponent);

    const cardElement = screen.getByRole('article');

    fireEvent.mouseEnter(cardElement);
    expect(mockDispatch).toHaveBeenCalledWith(setCurrentOffer(mockOffer));

    fireEvent.mouseLeave(cardElement);
    expect(mockDispatch).toHaveBeenCalledWith(setCurrentOffer(null));
  });

  it('should dispatch toggleFavoriteStatusAction when favorite button is clicked for authorized user', () => {
    vi.mocked(useAppSelector).mockImplementation((selector) => {
      if (selector === checkIsAuth) {
        return true;
      }
    });

    const withHistoryComponent = withHistory(
      <PlaceCard offer={mockOffer} className={PageType.CITIES} />,
      mockHistory
    );

    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      [authSlice.name]: { authorizationStatus: AuthStatus.Auth } as AuthInitialState,
    }));

    render(withStoreComponent);

    const favoriteButton = screen.getByRole('button');
    fireEvent.click(favoriteButton);

    expect(mockDispatch).toHaveBeenCalledWith(toggleFavoriteStatusAction({ id: mockOffer.id, status: 1 }));
  });

  it('should redirect to login page when favorite button is clicked for unauthorized user', async () => {
    vi.mocked(useAppSelector).mockImplementation((selector) => {
      if (selector === checkIsAuth) {
        return false;
      }
    });

    const withHistoryComponent = withHistory(
      <PlaceCard offer={mockOffer} className={PageType.CITIES} />,
      mockHistory
    );

    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      [authSlice.name]: { authorizationStatus: AuthStatus.NoAuth } as AuthInitialState,
    }));

    render(withStoreComponent);

    const favoriteButton = screen.getByTestId('favorite-button');
    await act(async () => {
      await userEvent.click(favoriteButton);
    });

    expect(mockNavigate).toHaveBeenCalledWith(AppRoute.Login, { replace: true });
  });
});
