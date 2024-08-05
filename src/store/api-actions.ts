import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.ts';
import axios, { AxiosInstance } from 'axios';
import { FullOffer, Offers } from '../types/offers.ts';
import { AuthStatus, Endpoint, NOT_FOUND_ERROR, RouteParams } from '../const.ts';
import { AuthData } from '../types/auth-data.ts';
import { UserData } from '../types/user.ts';
import { dropToken, saveToken } from '../services/token.ts';
import { Review, Reviews } from '../types/reviews.ts';
import { StatusCodes } from 'http-status-codes';

export const fetchOffersAction = createAsyncThunk<Offers, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/fetchOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Offers>(Endpoint.Offers);
    return data;
  }
);

export const fetchOfferAction = createAsyncThunk<
  { offer: FullOffer; nearby: Offers; comments: Reviews },
  string,
  {
    rejectValue: string;
    extra: AxiosInstance;
  }
>(
  'offers/fetchOffer',
  async (id, { extra: api, rejectWithValue }) => {
    try {
      const [offerResponse, nearbyResponse, commentsResponse] = await Promise.all([
        api.get<FullOffer>(Endpoint.Offer.replace(RouteParams.Id, id)),
        api.get<Offers>(`${Endpoint.Offer.replace(RouteParams.Id, id)}/nearby`),
        api.get<Reviews>(Endpoint.Comments.replace(RouteParams.OfferId, id)),
      ]);

      return {
        offer: offerResponse.data,
        nearby: nearbyResponse.data,
        comments: commentsResponse.data,
      };
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === StatusCodes.NOT_FOUND) {
        return rejectWithValue(NOT_FOUND_ERROR);
      }
      // Если ошибка не 404 или это не ошибка Axios, пробрасываем её дальше
      throw error;
    }
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'auth/checkAuth',
  async (_arg, { extra: api }) => {
    await api.get(Endpoint.Login); // Если запрос прошел, ничего не возвращаем, статус будет обрабатываться в extraReducers
  },
);

export const loginAction = createAsyncThunk<AuthStatus, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'auth/login',
  async ({ login: email, password }, { extra: api }) => {
    const { data: { token } } = await api.post<UserData>(Endpoint.Login, { email, password });
    saveToken(token);
    return AuthStatus.Auth;
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

export const addCommentAction = createAsyncThunk<Review, {
  id: string;
  dataComment: { comment: string; rating: number };
}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'comments/addComment',
  async ({ id, dataComment }, { extra: api }) => {
    const { data } = await api.post<Review>(Endpoint.Comments.replace(RouteParams.OfferId, id), dataComment);
    return data;
  }
);
