import { JSX } from 'react';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { AppRoute, Cities, RouteParams } from '../../const';
import { CityId } from '../../types/city';

function Tabs(): JSX.Element {
  const cityEntries = Object.values(Cities);
  const { cityId } = useParams<{ cityId: CityId }>(); // Используем CityId для типизации параметра

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cityEntries.map(({ id, name }) => (
            <li className="locations__item" key={id}>
              <Link
                to={AppRoute.Main.replace(RouteParams.CityId, id)}
                className={classNames('locations__item-link', 'tabs__item', {
                  'tabs__item--active': id === (cityId ?? Cities.Paris.id),
                })}
              >
                <span>{name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Tabs;
