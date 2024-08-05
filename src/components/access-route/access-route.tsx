import {Navigate} from 'react-router-dom';
import {ReactNode} from 'react';
import LoadingSpinner from '../loading-spinner/loading-spinner';
import {AppRoute, AuthStatus} from '../../const';
import { useAppSelector } from '../../hooks';
import { authorizationStatusSelector } from '../../store/selectors/auth/auth.ts';

export type AccessRouteProps = {
  children: ReactNode;
}

function createAccessRoute(statusToCheck: AuthStatus, fallbackPath: AppRoute) {
  return function AccessRoute({children}: AccessRouteProps) {
    const authorizationStatus = useAppSelector(authorizationStatusSelector);
    switch (authorizationStatus) {
      case statusToCheck:
        return children;
      case AuthStatus.Unknown:
        return <LoadingSpinner/>;
      default:
        return <Navigate to={fallbackPath}/>;
    }
  };
}

const PrivateRoute = createAccessRoute(AuthStatus.Auth, AppRoute.Login);
const PublicRoute = createAccessRoute(AuthStatus.NoAuth, AppRoute.Main);

export {PrivateRoute, PublicRoute};
