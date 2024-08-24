import { JSX, useMemo } from 'react';
import PlaceCard from '../place-card/place-card';
import { Offers } from '../../types/offers';
import { PageType } from '../../const';
import { useAppSelector } from '../../hooks';
import { getFavorites } from '../../store/selectors/favorites/favorites';
import { groupBy } from '../../utils/utils';

function FavoritesList(): JSX.Element {
  const favoriteOffers = useAppSelector(getFavorites);

  const favoriteOffersByGroup: Record<string, Offers> = useMemo(
    () => groupBy(favoriteOffers, (offer) => offer.city.name),
    [favoriteOffers]
  );

  const renderOffers = (offers: Offers) => (
    offers.map((offer) => (
      <PlaceCard key={offer.id} offer={offer} className={PageType.FAVORITES} />
    ))
  );

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
            {renderOffers(offers)}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default FavoritesList;
