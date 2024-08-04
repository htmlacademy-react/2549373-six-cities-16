import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.ts';
import { AxiosError, AxiosInstance } from 'axios';
import { FullOffer, Offers } from '../types/offers.ts';
import { APIRoute, AppRoute, AuthStatus, RouteParams } from '../const.ts';
import {
  loadComments,
  loadNearby,
  loadOffer,
  loadOffers,
  redirectToRoute,
  requireAuthorization,
  setOffersDataLoadingStatus
} from './action.ts';
import { AuthData } from '../types/auth-data.ts';
import { UserData } from '../types/user.ts';
import { dropToken, saveToken } from '../services/token.ts';
import { Reviews } from '../types/reviews.ts';
import { StatusCodes } from 'http-status-codes';


export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setOffersDataLoadingStatus(true));
    const { data } = await api.get<Offers>(APIRoute.Offers);
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(loadOffers(data));
  }
);

export const fetchOfferAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (id, { dispatch, extra: api }) => {
    dispatch(setOffersDataLoadingStatus(true));
    try {
      const [offerResponse, nearbyResponse, commentsResponse] = await Promise.all([
        api.get<FullOffer>(APIRoute.Offer.replace(RouteParams.Id, id)),
        api.get<Offers>(`${APIRoute.Offer.replace(RouteParams.Id, id)}/nearby`),
        api.get<Reviews>(APIRoute.Comments.replace(RouteParams.OfferId, id))
      ]);
      dispatch(setOffersDataLoadingStatus(false));

      dispatch(loadOffer(offerResponse.data));
      dispatch(loadNearby(nearbyResponse.data));
      dispatch(loadComments(commentsResponse.data));
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === StatusCodes.NOT_FOUND) {
        dispatch(setOffersDataLoadingStatus(false));
        dispatch(redirectToRoute(AppRoute.NotFound));
      }
    }
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data: { token } } = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(token);
    dispatch(requireAuthorization(AuthStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Main));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthStatus.NoAuth));
  },
);

export const addCommentAction = createAsyncThunk<void, {
  id: string;
  dataComment: { comment: string; rating: number };
}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/addComment',
  async ({ id, dataComment }, { dispatch, extra: api }) => {
    dispatch(setOffersDataLoadingStatus(true));
    const addedComment = await api.post<Reviews>(APIRoute.Comments.replace(RouteParams.OfferId, id), dataComment);
    const { data } = await api.get<Reviews>(APIRoute.Comments.replace(RouteParams.OfferId, id));
    dispatch(setOffersDataLoadingStatus(false));
    if(addedComment?.data){
      dispatch(loadComments(data));
    }
  }
);
