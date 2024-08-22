import { JSX } from 'react';
import { AppRoute, Cities, RouteParams } from '../../const';
import { Link } from 'react-router-dom';
import { getRandomCity } from '../../utils/utils';


function RandomCityLink(): JSX.Element {
  const cityEntries = Object.values(Cities);
  const randomCity = getRandomCity(cityEntries);

  return (
    <section className="locations locations--login locations--current">
      <div className="locations__item">
        <Link className="locations__item-link" to={AppRoute.Main.replace(RouteParams.CityId, randomCity.id)}>
          <span>{randomCity.name}</span>
        </Link>
      </div>
    </section>
  );
}

export default RandomCityLink;
