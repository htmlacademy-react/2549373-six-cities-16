import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withHistory, withStore } from '../../utils/mock-component';
import Nav from './nav';
import { AuthStatus } from '../../const';
import { createMemoryHistory } from 'history';
import authSlice, { AuthInitialState } from '../../store/slices/auth/auth';
import { makeFakeStore } from '../../utils/moks';
import { vi } from 'vitest';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { checkIsAuth, getUser } from '../../store/selectors/auth/auth';
import { getCountFavorites } from '../../store/selectors/favorites/favorites';

vi.mock('../../hooks', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

describe('Component: Nav', () => {
  const mockDispatch = vi.fn();
  const mockHistory = createMemoryHistory();
  const user = { email: 'test@test.com', avatarUrl: 'avatar-url' };

  beforeEach(() => {
    vi.mocked(useAppDispatch).mockReturnValue(mockDispatch);
    vi.mocked(useAppSelector).mockImplementation((selector) => {
      if (selector === checkIsAuth) {
        return true;
      }
      if (selector === getUser) {
        return user;
      }
      if (selector === getCountFavorites) {
        return 5;
      }
    });
  });

  it('should render "Sign in" link when user is not authorized', () => {
    vi.mocked(useAppSelector).mockImplementation((selector) => {
      if (selector === checkIsAuth) {
        return false;
      }
    });

    const withHistoryComponent = withHistory(<Nav />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        [authSlice.name]: { authorizationStatus: AuthStatus.NoAuth } as AuthInitialState,
      })
    );

    render(withStoreComponent);

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
    expect(screen.queryByText(/Sign out/i)).not.toBeInTheDocument();
  });

  it('should render user info and "Sign out" link when user is authorized', () => {
    const withHistoryComponent = withHistory(<Nav />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        [authSlice.name]: {
          authorizationStatus: AuthStatus.Auth,
          user,
        } as AuthInitialState,
      })
    );

    render(withStoreComponent);

    expect(screen.getByText(user.email)).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });

  it('should dispatch logoutAction when "Sign out" link is clicked', async () => {
    const withHistoryComponent = withHistory(<Nav />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        [authSlice.name]: {
          authorizationStatus: AuthStatus.Auth,
          user,
        } as AuthInitialState,
      })
    );

    render(withStoreComponent);

    const signOutLink = screen.getByText(/Sign out/i);
    await userEvent.click(signOutLink);

    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
  });
});
