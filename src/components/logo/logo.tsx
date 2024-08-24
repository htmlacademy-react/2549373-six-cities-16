import { JSX } from 'react';
import {Link} from 'react-router-dom';
import { LOGO_SRC } from '../../const';

type LogoProps = {
  width: string;
  height: string;
}

function Logo({width, height}: LogoProps): JSX.Element {
  return (
    <Link to='/' className="header__logo-link header__logo-link--active">
      <img className="header__logo" src={LOGO_SRC} alt="6 cities logo" width={width} height={height}/>
    </Link>
  );
}

export default Logo;
