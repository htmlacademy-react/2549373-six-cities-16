import { createSlice, isPending, isRejected, isFulfilled, PayloadAction } from '@reduxjs/toolkit';
import { AuthStatus, RequestStatus } from '../../../const';
import { Nullable } from '../../../types/globals';
import { User } from '../../../types/user';
import { setFailed, setLoading } from '../../utils/utils';
import { checkAuthAction, loginAction, logoutAction } from '../../async-thunk/auth/auth';

export type AuthInitialState = {
  authorizationStatus: AuthStatus;
  requestStatus: RequestStatus;
  user: Nullable<User>;
};

const initialState: AuthInitialState = {
  authorizationStatus: AuthStatus.Unknown,
  requestStatus: RequestStatus.Idle,
  user: null,
};

const handleAuthRejected = (state: AuthInitialState) => {
  state.requestStatus = RequestStatus.Failed;
  state.authorizationStatus = AuthStatus.NoAuth;
  state.user = null;
};

const handleAuthFulfilled = (state: AuthInitialState, action: PayloadAction<User>) => {
  state.requestStatus = RequestStatus.Success;
  state.authorizationStatus = AuthStatus.Auth;
  state.user = action.payload;
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending(checkAuthAction, loginAction, logoutAction), setLoading)
      .addMatcher(isFulfilled(checkAuthAction, loginAction), handleAuthFulfilled)
      .addMatcher(isRejected(checkAuthAction, loginAction), handleAuthRejected)
      .addMatcher(isFulfilled(logoutAction),
        (state) => {
          state.requestStatus = RequestStatus.Success;
          state.authorizationStatus = AuthStatus.NoAuth;
          state.user = null;
        }
      )
      .addMatcher(isRejected(logoutAction), setFailed);
  },
});

export default authSlice;
