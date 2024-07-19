import {JSX} from 'react';
import {Link, useSearchParams} from 'react-router-dom';
import {AppRoute, Cities, QUERY_PARAMETER} from '../../const';
import {CityName} from '../../types/city.ts';

function Tabs(): JSX.Element {
  const cityEntries: CityName[] = Object.values(Cities);
  const [searchParams] = useSearchParams();
  const slugParam = searchParams.get(QUERY_PARAMETER) as CityName | null;

  function getClasses(city: CityName): string {
    return `locations__item-link tabs__item ${city === (slugParam ?? Cities.Paris) ? 'tabs__item--active' : ''}`;
  }

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cityEntries.map((city) => (
            <li className="locations__item" key={city}>
              <Link
                to={`${AppRoute.Main}?${QUERY_PARAMETER}=${city}`}
                className={getClasses(city)}
              >
                <span>{city}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Tabs;
