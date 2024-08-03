import { JSX } from 'react';
import Logo from '../logo/logo.tsx';
import Nav from '../nav/nav.tsx';
import { useLocation } from 'react-router-dom';
import { AppRoute } from '../../const.ts';

function Header(): JSX.Element {
  const location = useLocation();
  const currentPath: AppRoute = location.pathname as AppRoute;
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo width="81" height="41"/>
          </div>
          {currentPath !== AppRoute.Login && <Nav/>}
        </div>
      </div>
    </header>
  );
}

export default Header;
