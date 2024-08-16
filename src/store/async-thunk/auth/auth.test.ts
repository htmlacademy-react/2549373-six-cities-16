import { checkAuthAction, loginAction, logoutAction } from './auth';
import { Endpoint } from '../../../const';
import { extractActionsTypes, makeFakeState, makeFakeStore, mockAxiosAdapter, mockStore } from '../../../utils/moks.ts';
import authSlice from '../../slices/auth/auth.ts';

describe('Auth async actions', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore(makeFakeStore());
  });

  it('should dispatch "checkAuthAction.pending" and "checkAuthAction.fulfilled" with thunk "checkAuthAction"', async () => {
    mockAxiosAdapter.onGet(Endpoint.Login).reply(200);

    await store.dispatch(checkAuthAction());
    const actions = extractActionsTypes(store.getActions());

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.fulfilled.type,
    ]);
  });

  it('should dispatch "checkAuthAction.pending" and "checkAuthAction.rejected" when server response is an error', async () => {
    mockAxiosAdapter.onGet(Endpoint.Login).reply(400);

    await store.dispatch(checkAuthAction());
    const actions = extractActionsTypes(store.getActions());

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.rejected.type,
    ]);
  });

  it('should dispatch "loginAction.pending" and "loginAction.fulfilled" when server response 200', async () => {
    // const mockUser = { id: '1', name: 'John Doe' };
    const mockUser = makeFakeState()[authSlice.name]['user'];
    mockAxiosAdapter.onPost(Endpoint.Login).reply(200, mockUser);

    await store.dispatch(loginAction({ login: 'test@test.com', password: '123456' }));
    const actions = extractActionsTypes(store.getActions());

    expect(actions).toEqual([
      loginAction.pending.type,
      loginAction.fulfilled.type,
    ]);
  });

  it('should dispatch "loginAction.pending" and "loginAction.rejected" when server response 400', async () => {
    mockAxiosAdapter.onPost(Endpoint.Login).reply(400);

    await store.dispatch(loginAction({ login: 'test@test.com', password: '123456' }));
    const actions = extractActionsTypes(store.getActions());

    expect(actions).toEqual([
      loginAction.pending.type,
      loginAction.rejected.type,
    ]);
  });

  it('should dispatch "logoutAction.pending" and "logoutAction.fulfilled" when server response 200', async () => {
    mockAxiosAdapter.onDelete(Endpoint.Logout).reply(200);

    await store.dispatch(logoutAction());
    const actions = extractActionsTypes(store.getActions());

    expect(actions).toEqual([
      logoutAction.pending.type,
      logoutAction.fulfilled.type,
    ]);
  });

  it('should dispatch "logoutAction.pending" and "logoutAction.rejected" when server response 400', async () => {
    mockAxiosAdapter.onDelete(Endpoint.Logout).reply(400);

    await store.dispatch(logoutAction());
    const actions = extractActionsTypes(store.getActions());

    expect(actions).toEqual([
      logoutAction.pending.type,
      logoutAction.rejected.type,
    ]);
  });
});
