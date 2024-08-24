import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './login';
import { withStore, withHistory } from '../../utils/mock-component';
import { loginAction } from '../../store/async-thunk/auth/auth';
import { MockStoreEnhanced } from '@jedmao/redux-mock-store';
import { State } from '../../types/state';
import { AnyAction } from '@reduxjs/toolkit';
import { makeFakeStore } from '../../utils/moks';

describe('Component: Login', () => {
  let withHistoryComponent: JSX.Element;
  let withStoreComponent: JSX.Element;
  let mockStore: MockStoreEnhanced<State, AnyAction>;

  beforeEach(() => {
    withHistoryComponent = withHistory(<Login />);
    const storeSetup = withStore(withHistoryComponent, makeFakeStore());
    withStoreComponent = storeSetup.withStoreComponent;
    mockStore = storeSetup.mockStore as MockStoreEnhanced<State, AnyAction>;
  });

  it('should render the login component correctly', () => {
    render(withStoreComponent);
    expect(screen.getByTestId('login-title')).toBeInTheDocument();
  });

  it('should render email input correctly', () => {
    render(withStoreComponent);
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
  });

  it('should render password input correctly', () => {
    render(withStoreComponent);
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
  });

  it('should successfully submit the form with valid data', async () => {
    render(withStoreComponent);

    fireEvent.change(screen.getByTestId('email-input'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByTestId('password-input'), { target: { value: 'password1' } });

    fireEvent.submit(screen.getByRole('button', { name: 'Sign in' }));

    await waitFor(() => {
      const actions = mockStore.getActions();
      expect(actions[0].type).toBe(loginAction.pending.type);
    });
  });
});
