import { AuthStatus } from '../../../const';
import { makeFakeState } from '../../../utils/moks';
import { authorizationStatusSelector, checkIsAuth, getUser } from './auth';
import authSlice from '../../slices/auth/auth';

describe('Selectors: auth', () => {
  const mockState = makeFakeState();
  mockState[authSlice.name]['authorizationStatus'] = AuthStatus.Auth;

  it('should return the correct authorization status', () => {
    const result = authorizationStatusSelector(mockState);
    expect(result).toBe(AuthStatus.Auth);
  });

  it('should return the correct user', () => {
    const result = getUser(mockState);
    expect(result).toEqual(mockState.auth.user);
  });

  it('should return true if user is authorized', () => {
    const result = checkIsAuth(mockState);
    expect(result).toBe(true);
  });

  it('should return false if user is not authorized', () => {
    const mockStateNoAuth = makeFakeState();
    mockStateNoAuth[authSlice.name]['authorizationStatus'] = AuthStatus.NoAuth;
    const result = checkIsAuth(mockStateNoAuth);
    expect(result).toBe(false);
  });
});
