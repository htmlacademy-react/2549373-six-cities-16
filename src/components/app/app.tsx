import { JSX } from 'react';
import NotFound from '../../pages/not-found/not-found';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import { PrivateRoute, PublicRoute } from '../access-route/access-route';
import { AppRoute, AuthStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import LoadingSpinner from '../loading-spinner/loading-spinner.tsx';
import Offer from '../../pages/offer/offer.tsx';
import { authorizationStatusSelector } from '../../store/selectors/auth/auth.ts';
import { isOffersDataLoadingSelector } from '../../store/selectors/offers/offers.ts';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(authorizationStatusSelector);
  const isOffersDataLoading = useAppSelector(isOffersDataLoadingSelector);
  const isLoading = authorizationStatus === AuthStatus.Unknown || isOffersDataLoading;
  if (isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<Main/>}/>
        <Route path={AppRoute.Login} element={
          <PublicRoute>
            <Login/>
          </PublicRoute>
        }
        />
        <Route path={AppRoute.Favorites} element={
          <PrivateRoute>
            <Favorites/>
          </PrivateRoute>
        }
        />
        <Route path={AppRoute.Offer} element={<Offer />}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
