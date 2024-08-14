import { State } from '../../../types/state.ts';
import { createSelector } from '@reduxjs/toolkit';
import { AuthStatus } from '../../../const.ts';

export const authorizationStatusSelector = (state: State) => state.auth.authorizationStatus;
export const getUser = (state: State) => state.auth.user;
export const checkIsAuth = createSelector(
  [authorizationStatusSelector],
  (authorizationStatus) => authorizationStatus === AuthStatus.Auth
);
