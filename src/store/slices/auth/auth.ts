import { createSlice } from '@reduxjs/toolkit';
import { AuthStatus, RequestStatus } from '../../../const.ts';
import { checkAuthAction, loginAction, logoutAction } from '../../api-actions.ts';

type InitialState = {
  authorizationStatus: AuthStatus;
  requestStatus: RequestStatus;
};

const initialState: InitialState = {
  authorizationStatus: AuthStatus.Unknown,
  requestStatus: RequestStatus.Idle,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthAction.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(checkAuthAction.fulfilled, (state) => {
        state.requestStatus = RequestStatus.Success;
        state.authorizationStatus = AuthStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
        state.authorizationStatus = AuthStatus.NoAuth;
      })
      .addCase(loginAction.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.requestStatus = RequestStatus.Success;
        state.authorizationStatus = AuthStatus.Auth;
      })
      .addCase(loginAction.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(logoutAction.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.requestStatus = RequestStatus.Success;
        state.authorizationStatus = AuthStatus.NoAuth;
      })
      .addCase(logoutAction.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      });
  },
});

export default authSlice;
