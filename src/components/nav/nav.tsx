import { JSX, MouseEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AppRoute } from '../../const';
import { Link } from 'react-router-dom';
import { checkIsAuth, getUser } from '../../store/selectors/auth/auth';
import { getCountFavorites } from '../../store/selectors/favorites/favorites';
import { logoutAction } from '../../store/async-thunk/auth/auth';

function Nav(): JSX.Element {
  const isAuth = useAppSelector(checkIsAuth);
  const user = useAppSelector(getUser);
  const countFavorites = useAppSelector(getCountFavorites);
  const dispatch = useAppDispatch();

  function handleLogout(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    dispatch(logoutAction());
  }

  const userAvatarStyle = user
    ? {
      backgroundImage: `url(${user.avatarUrl})`,
      borderRadius: '50%',
    }
    : {};

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {isAuth ? (
          <>
            <li className="header__nav-item user">
              <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                <div className="header__avatar-wrapper user__avatar-wrapper" style={userAvatarStyle}/>
                <span className="header__user-name user__name">{user?.email}</span>
                <span className="header__favorite-count">{countFavorites}</span>
              </Link>
            </li>
            <li className="header__nav-item">
              <Link className="header__nav-link" onClick={handleLogout} to={AppRoute.Main}>
                <span className="header__signout">Sign out</span>
              </Link>
            </li>
          </>
        ) : (
          <li className="header__nav-item user">
            <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
              <div className="header__avatar-wrapper user__avatar-wrapper"></div>
              <span className="header__login">Sign in</span>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
