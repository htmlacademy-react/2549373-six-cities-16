import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AppDispatch, State } from '../../../types/state.ts';
import { Offers, OfferType } from '../../../types/offers.ts';
import { Endpoint, RouteParams } from '../../../const.ts';

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
