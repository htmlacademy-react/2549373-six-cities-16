import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { Review } from '../../../types/reviews.ts';
import { AppDispatch, State } from '../../../types/state.ts';
import { Endpoint, RouteParams } from '../../../const.ts';

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
