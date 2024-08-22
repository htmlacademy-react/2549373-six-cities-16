import { createMemoryHistory, MemoryHistory } from 'history';
import HistoryRouter from '../components/history-route/history-route';
import { HelmetProvider } from 'react-helmet-async';
import { configureMockStore, MockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { State } from '../types/state';
import { createAPI } from '../services/api';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { Provider } from 'react-redux';
import { AppThunkDispatch, makeFakeStore } from './moks';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute, AuthStatus, Cities, RouteParams } from '../const';
import ProtectedRoute from '../components/protected-route/protected-route';
import authSlice, { AuthInitialState } from '../store/slices/auth/auth';
import { render } from '@testing-library/react';

export function withHistory(component: JSX.Element, history?: MemoryHistory) {
  const memoryHistory = history ?? createMemoryHistory();
  return (
    <HistoryRouter history={memoryHistory}>
      <HelmetProvider>
        {component}
      </HelmetProvider>
    </HistoryRouter>
  );
}

type ComponentWithMockStore = {
  withStoreComponent: JSX.Element;
  mockStore: MockStore;
  mockAxiosAdapter: MockAdapter;
};

export function withStore(
  component: JSX.Element,
  initialState: Partial<State> = {},
): ComponentWithMockStore {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  const mockStore = mockStoreCreator(initialState);

  return {
    withStoreComponent: <Provider store={mockStore}>{component}</Provider>,
    mockStore,
    mockAxiosAdapter,
  };
}

export const createRoutes = () => (
  <Routes>
    <Route path={AppRoute.Login} element={
      <ProtectedRoute onlyUnAuth>
        <div>Mock Login Component</div>
      </ProtectedRoute>
    }
    />
    <Route path={AppRoute.Favorites} element={
      <ProtectedRoute>
        <div>Mock Protected Component</div>
      </ProtectedRoute>
    }
    />
    <Route path={AppRoute.Main.replace(RouteParams.CityId, Cities.Paris.id)} element={<div>Redirected to Main</div>}/>
  </Routes>
);

export const renderWithSetup = (mockHistory: MemoryHistory, authStatus: AuthStatus, route: string, initialState = {}) => {
  const state = makeFakeStore({
    [authSlice.name]: { authorizationStatus: authStatus } as AuthInitialState,
    ...initialState,
  });

  const withHistoryComponent = withHistory(createRoutes(), mockHistory);
  const { withStoreComponent } = withStore(withHistoryComponent, state);

  mockHistory.push(route);
  render(withStoreComponent);
};

export function renderWithBrowserRouter(component: JSX.Element) {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
}
