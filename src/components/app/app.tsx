import { JSX, useEffect } from 'react';
import NotFound from '../../pages/not-found/not-found';
import { Route, Routes } from 'react-router-dom';
import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import { AppRoute, AuthStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import LoadingSpinner from '../loading-spinner/loading-spinner.tsx';
import Offer from '../../pages/offer/offer.tsx';
import { authorizationStatusSelector, checkIsAuth } from '../../store/selectors/auth/auth.ts';
import { isOffersDataLoadingSelector } from '../../store/selectors/offers/offers.ts';
import ProtectedRoute from '../protected-route/protected-route.tsx';
import { fetchFavoritesAction } from '../../store/async-thunk/favorites/favorites.ts';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(authorizationStatusSelector);
  const isAuth = useAppSelector(checkIsAuth);
  const isOffersDataLoading = useAppSelector(isOffersDataLoadingSelector);
  const dispatch = useAppDispatch();
  const isLoading = authorizationStatus === AuthStatus.Unknown || isOffersDataLoading;
  useEffect(() => {
    if (isAuth) {
      dispatch(fetchFavoritesAction());
    }

  }, [isAuth, dispatch]);

  if (isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <Routes>
      <Route path={AppRoute.Main} element={<Main/>}/>
      <Route path={AppRoute.Login} element={
        <ProtectedRoute onlyUnAuth>
          <Login/>
        </ProtectedRoute>
      }
      />
      <Route path={AppRoute.Favorites} element={
        <ProtectedRoute>
          <Favorites/>
        </ProtectedRoute>
      }
      />
      <Route path={AppRoute.Offer} element={<Offer/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  );
}

export default App;
