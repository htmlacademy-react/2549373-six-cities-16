import { JSX } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { AppRoute, Cities, RouteParams } from '../../const';
import { checkIsAuth } from '../../store/selectors/auth/auth.ts';

type FromState = {
  from?: {
    pathname: string;
  };
};

type ProtectedRouteProps = {
  children: JSX.Element;
  onlyUnAuth?: boolean;
};

export default function ProtectedRoute({ children, onlyUnAuth = false }: ProtectedRouteProps): JSX.Element {
  const location = useLocation() as unknown as { state: FromState };
  const isAuth = useAppSelector(checkIsAuth);

  if (onlyUnAuth && isAuth) {
    const from = location.state?.from?.pathname || AppRoute.Main.replace(RouteParams.CityId, Cities.Paris.id);
    return <Navigate to={from} replace />;
  }

  if (!onlyUnAuth && !isAuth) {
    return <Navigate state={{ from: location }} to={AppRoute.Login} replace />;
  }

  return children;
}
