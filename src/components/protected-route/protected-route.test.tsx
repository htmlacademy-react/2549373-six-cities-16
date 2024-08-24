import { screen } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import { AppRoute, AuthStatus } from '../../const';
import { renderWithSetup } from '../../utils/mock-component';

describe('ProtectedRoute Component Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should redirect unauthenticated user to login page on protected route', () => {
    renderWithSetup(mockHistory, AuthStatus.NoAuth, AppRoute.Favorites);
    expect(screen.getByText('Mock Login Component')).toBeInTheDocument();
  });

  it('should render child component for authenticated user on protected route', () => {
    renderWithSetup(mockHistory, AuthStatus.Auth, AppRoute.Favorites);
    expect(screen.getByText('Mock Protected Component')).toBeInTheDocument();
  });

  it('should render fallback component for unauthenticated users on a public route', () => {
    renderWithSetup(mockHistory, AuthStatus.NoAuth, AppRoute.Login);
    expect(screen.getByText('Mock Login Component')).toBeInTheDocument();
  });

  it('should redirect authenticated user from login page to main page', () => {
    renderWithSetup(mockHistory, AuthStatus.Auth, AppRoute.Login);
    expect(screen.getByText('Redirected to Main')).toBeInTheDocument();
  });
});
