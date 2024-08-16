import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { Provider } from 'react-redux';
import { store } from './store';
import 'react-toastify/dist/ReactToastify.css';
import { HelmetProvider } from 'react-helmet-async';
import { fetchOffersAction } from './store/async-thunk/offers/offers.ts';
import { checkAuthAction } from './store/async-thunk/auth/auth.ts';
import HistoryRouter from './components/history-route/history-route.tsx';
import browserHistory from './browser-history.ts';

store.dispatch(fetchOffersAction());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <HelmetProvider>
          <App/>
        </HelmetProvider>
      </HistoryRouter>
    </Provider>
  </React.StrictMode>
);

