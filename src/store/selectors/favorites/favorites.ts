import { State } from '../../../types/state.ts';

export const getCountFavorites = (state: State) => state.favorites.favorites.length;
export const getFavorites = (state: State) => state.favorites.favorites;
