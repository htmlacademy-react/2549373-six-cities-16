import { JSX } from 'react';
import NotFound from '../../pages/not-found/not-found';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import Offer from '../../pages/offer/offer';
import { PrivateRoute, PublicRoute } from '../access-route/access-route';
import { AppRoute, AuthStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import { isOffersDataLoadingSelector } from '../../store/selectors.ts';
import LoadingSpinner from '../loading-spinner/loading-spinner.tsx';

function App(): JSX.Element {
  const currentStatus: AuthStatus = AuthStatus.Auth;
  const isOffersDataLoading = useAppSelector(isOffersDataLoadingSelector);

  if (isOffersDataLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Main} element={<Main/>}/>
        <Route path={AppRoute.Login} element={
          <PublicRoute status={currentStatus}>
            <Login/>
          </PublicRoute>
        }
        />
        <Route path={AppRoute.Favorites} element={
          <PrivateRoute status={currentStatus}>
            <Favorites/>
          </PrivateRoute>
        }
        />
        <Route path={AppRoute.Offer} element={<Offer/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
