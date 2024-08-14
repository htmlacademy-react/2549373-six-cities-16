import { State } from '../../../types/state.ts';

export const authorizationStatusSelector = (state: State) => state.auth.authorizationStatus;
