import { describe, it, expect } from 'vitest';
import { AuthStatus, RequestStatus } from '../../../const';
import { User } from '../../../types/user';
import authSlice from './auth.ts';
import { makeFakeState, makeFakeStore } from '../../../utils/moks.ts';
import { Nullable } from '../../../types/globals.ts';
import { checkAuthAction, logoutAction } from '../../async-thunk/auth/auth.ts';

describe('Auth slice', () => {
  const initialState = makeFakeState()[authSlice.name];

  it('should set loading state when checkAuthAction is pending', () => {
    const action = { type: checkAuthAction.pending.type };
    const state = authSlice.reducer(initialState, action);
    expect(state.requestStatus).toBe(RequestStatus.Loading);
  });

  it('should set success state and update user on fulfilled checkAuthAction', () => {
    const user: Nullable<User> = makeFakeState()[authSlice.name]['user'];
    const action = { type: checkAuthAction.fulfilled.type, payload: user };
    const state = authSlice.reducer(initialState, action);
    expect(state.requestStatus).toBe(RequestStatus.Success);
    expect(state.authorizationStatus).toBe(AuthStatus.Auth);
    expect(state.user).toEqual(user);
  });

  it('should set failed state and reset user on rejected checkAuthAction', () => {
    const action = { type: checkAuthAction.rejected.type };
    const state = authSlice.reducer(initialState, action);
    expect(state.requestStatus).toBe(RequestStatus.Failed);
    expect(state.authorizationStatus).toBe(AuthStatus.NoAuth);
    expect(state.user).toBeNull();
  });

  it('should reset user and set no auth state on fulfilled logoutAction', () => {
    const prevState = makeFakeStore({
      [authSlice.name]: {
        authorizationStatus: AuthStatus.Auth,
        requestStatus: RequestStatus.Success,
        user: makeFakeState()[authSlice.name]['user'],
      },
    })[authSlice.name];
    const action = { type: logoutAction.fulfilled.type };
    const state = authSlice.reducer(prevState, action);
    expect(state.requestStatus).toBe(RequestStatus.Success);
    expect(state.authorizationStatus).toBe(AuthStatus.NoAuth);
    expect(state.user).toBeNull();
  });

  it('should set failed state on rejected logoutAction', () => {
    const user = makeFakeState()[authSlice.name]['user'];
    const prevState = makeFakeStore({
      [authSlice.name]: {
        authorizationStatus: AuthStatus.Auth,
        requestStatus: RequestStatus.Success,
        user,
      },
    })[authSlice.name];
    const action = { type: logoutAction.rejected.type };
    const state = authSlice.reducer(prevState, action);
    expect(state.requestStatus).toBe(RequestStatus.Failed);
    expect(state.authorizationStatus).toBe(AuthStatus.Auth);
    expect(state.user).toEqual(user);
  });
});
