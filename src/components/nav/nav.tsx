import { JSX, MouseEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { authorizationStatusSelector } from '../../store/selectors.ts';
import { AppRoute, AuthStatus } from '../../const.ts';
import { Link } from 'react-router-dom';
import { logoutAction } from '../../store/api-actions.ts';

function Nav(): JSX.Element {
  const authorizationStatus = useAppSelector(authorizationStatusSelector);
  const dispatch = useAppDispatch();

  function handleLogout(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    dispatch(logoutAction());
  }

  if (authorizationStatus !== AuthStatus.Auth) {
    return (
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
              <div className="header__avatar-wrapper user__avatar-wrapper"></div>
              <span className="header__login">Sign in</span>
            </Link>
          </li>
        </ul>
      </nav>
    );
  }

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        <li className="header__nav-item user">
          <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Main}>
            <div className="header__avatar-wrapper user__avatar-wrapper"></div>
            <span className="header__user-name user__name">Oliver.conner@gmail.com </span>
            <span className="header__favorite-count">3</span>
          </Link>
        </li>
        <li className="header__nav-item">
          <Link className="header__nav-link" onClick={handleLogout} to={AppRoute.Main}>
            <span className="header__signout">Sign out</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
