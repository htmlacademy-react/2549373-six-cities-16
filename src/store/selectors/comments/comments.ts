import { State } from '../../../types/state';
import { Reviews } from '../../../types/reviews';

export const getComments = (state: State): Reviews => state.comments.comments.length > 0
  ? [...state.comments.comments]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  : state.comments.comments;

