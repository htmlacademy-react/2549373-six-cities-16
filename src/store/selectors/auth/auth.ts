import { State } from '../../../types/state';
import { createSelector } from '@reduxjs/toolkit';
import { AuthStatus } from '../../../const';

export const authorizationStatusSelector = (state: State) => state.auth.authorizationStatus;
export const getUser = (state: State) => state.auth.user;
export const checkIsAuth = createSelector(
  [authorizationStatusSelector],
  (authorizationStatus) => authorizationStatus === AuthStatus.Auth
);
