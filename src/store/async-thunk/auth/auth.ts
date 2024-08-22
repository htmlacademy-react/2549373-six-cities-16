import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../../../types/state';
import { User } from '../../../types/user';
import { AuthStatus, Endpoint } from '../../../const';
import { AuthData } from '../../../types/auth-data';
import { dropToken, saveToken } from '../../../services/token';

export const checkAuthAction = createAsyncThunk<User, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'auth/checkAuth',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<User>(Endpoint.Login);
    return data;
  },
);

export const loginAction = createAsyncThunk<User, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'auth/login',
  async ({ login: email, password }, { extra: api }) => {
    const { data } = await api.post<User>(Endpoint.Login, { email, password });
    saveToken(data.token);
    return data;
  },
);

export const logoutAction = createAsyncThunk<AuthStatus, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'auth/logout',
  async (_arg, { extra: api }) => {
    await api.delete(Endpoint.Logout);
    dropToken();
    return AuthStatus.NoAuth;
  },
);
