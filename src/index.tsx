import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {offers} from './mocks/offers';

// eslint-disable-next-line react-refresh/only-export-components
const Settings = {
  Offers: offers
} as const;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offers={Settings.Offers} />
  </React.StrictMode>
);
