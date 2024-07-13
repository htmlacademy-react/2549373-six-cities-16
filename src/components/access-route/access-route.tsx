import {Navigate} from 'react-router-dom';
import {AppRoute, AuthStatus} from '../../types/enems/enams';
import {ReactNode} from 'react';
import LoadingSpinner from '../loading-spinner/loading-spinner';

export type AccessRouteProps = {
  children: ReactNode;
  status: AuthStatus;
}

function createAccessRoute(statusToCheck: AuthStatus, fallbackPath: AppRoute) {
  return function AccessRoute({children, status}: AccessRouteProps) {
    switch (status) {
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
