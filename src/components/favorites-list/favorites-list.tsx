import { JSX, useMemo } from 'react';
import PlaceCard from '../place-card/place-card';
import { Offers, } from '../../types/offers.ts';
import { PageType } from '../../const.ts';
import { useAppSelector } from '../../hooks';
import { getFavorites } from '../../store/selectors/favorites/favorites.ts';
import { groupBy } from '../../utils/utils.ts';

function FavoritesList(): JSX.Element {
  const favoriteOffers = useAppSelector(getFavorites);
  const favoriteOffersByGroup: Record<string, Offers> =
    useMemo(() => groupBy(favoriteOffers, (offer) => offer.city.name), [favoriteOffers]);
  return (
    <ul className="favorites__list">
      {Object.entries(favoriteOffersByGroup).map(([city, offers]) => (
        <li key={city} className="favorites__locations-items">
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>{city}</span>
              </a>
            </div>
          </div>
          <div className="favorites__places">
            {offers && offers.map((offer) => (
              <PlaceCard
                key={offer.id} offer={offer}
                className={PageType.FAVORITES}
              />
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default FavoritesList;
