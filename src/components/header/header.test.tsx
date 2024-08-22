import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import Header from './header';
import { withHistory, withStore } from '../../utils/mock-component';
import { AppRoute, AuthStatus } from '../../const';
import authSlice, { AuthInitialState } from '../../store/slices/auth/auth';
import { makeFakeStore } from '../../utils/moks';

describe('Component: Header', () => {
  it('should render logo and navigation on non-login pages', () => {
    const mockHistory = createMemoryHistory();
    mockHistory.push(AppRoute.Root);

    const withHistoryComponent = withHistory(<Header />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        [authSlice.name]: { authorizationStatus: AuthStatus.Auth } as AuthInitialState,
      })
    );

    render(withStoreComponent);

    expect(screen.getByAltText(/6 cities logo/i)).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('should not render navigation on the login page', () => {
    const mockHistory = createMemoryHistory();
    mockHistory.push(AppRoute.Login);

    const withHistoryComponent = withHistory(<Header />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        [authSlice.name]: { authorizationStatus: AuthStatus.NoAuth } as AuthInitialState,
      })
    );

    render(withStoreComponent);

    expect(screen.getByAltText(/6 cities logo/i)).toBeInTheDocument();
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });
});
