import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosInstance } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { Reviews } from '../../../types/reviews.ts';
import { FullOffer, Offers } from '../../../types/offers.ts';
import { Endpoint, NOT_FOUND_ERROR, RouteParams } from '../../../const.ts';

export const fetchOfferAction = createAsyncThunk<
  { offer: FullOffer; nearby: Offers; comments: Reviews },
  string,
  {
    rejectValue: string;
    extra: AxiosInstance;
  }
>(
  'offer/fetchOffer',
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
