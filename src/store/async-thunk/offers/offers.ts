import { createAsyncThunk } from '@reduxjs/toolkit';
import { Offers } from '../../../types/offers.ts';
import { AppDispatch, State } from '../../../types/state.ts';
import { AxiosInstance } from 'axios';
import { Endpoint } from '../../../const.ts';

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
