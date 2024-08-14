import { State } from '../../../types/state.ts';
import { Reviews } from '../../../types/reviews.ts';

export const getComments = (state: State): Reviews => state.comments.comments;
