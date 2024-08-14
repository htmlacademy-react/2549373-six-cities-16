import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.ts';
import axios, { AxiosInstance } from 'axios';
import { FullOffer, Offers, OfferType } from '../types/offers.ts';
import { AuthStatus, Endpoint, NOT_FOUND_ERROR, RouteParams } from '../const.ts';
import { AuthData } from '../types/auth-data.ts';
import { User } from '../types/user.ts';
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

      throw error;
    }
  }
);

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
    const { data} = await api.post<User>(Endpoint.Login, { email, password });
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

export const toggleFavoriteStatusAction = createAsyncThunk<
  OfferType,
  { id: string; status: number },
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>(
  'favorites/toggleFavoriteStatus',
  async ({ id, status }, { extra: api }) => {
    const { data } = await api.post<OfferType>(
      Endpoint.Favorite.replace(RouteParams.OfferId, id).replace(RouteParams.Status, String(status)),
      { status }
    );
    return data;
  }
);

export const fetchFavoritesAction = createAsyncThunk<
  Offers,
  undefined,
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>(
  'favorites/fetchFavorites',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<Offers>(Endpoint.Favorites);
    return data;
  }
);
