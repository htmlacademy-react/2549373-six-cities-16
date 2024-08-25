import { JSX, useMemo } from 'react';
import PlaceCard from '../place-card/place-card';
import { Offers } from '../../types/offers';
import { AppRoute, Cities, PageType, RouteParams } from '../../const';
import { useAppSelector } from '../../hooks';
import { getFavorites } from '../../store/selectors/favorites/favorites';
import { groupBy } from '../../utils/utils';
import { Link } from 'react-router-dom';
import { CityName } from '../../types/city';

function FavoritesList(): JSX.Element {
  const favoriteOffers = useAppSelector(getFavorites);

  const favoriteOffersByGroup: Record<CityName, Offers> = useMemo(
    () => groupBy(favoriteOffers, (offer) => offer.city.name as CityName),
    [favoriteOffers]
  );

  const renderOffers = (offers: Offers) => (
    offers.map((offer) => (
      <PlaceCard key={offer.id} offer={offer} className={PageType.FAVORITES} />
    ))
  );

  return (
    <ul className="favorites__list">
      {Object.entries(favoriteOffersByGroup).map(([city, offers]) => {
        const cityId = Cities[city as CityName]?.id;

        return (
          <li key={city} className="favorites__locations-items">
            <div className="favorites__locations locations locations--current">
              <div className="locations__item">
                <Link className="locations__item-link" to={AppRoute.Main.replace(RouteParams.CityId, cityId)}>
                  <span>{city}</span>
                </Link>
              </div>
            </div>
            <div className="favorites__places">
              {renderOffers(offers)}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default FavoritesList;
