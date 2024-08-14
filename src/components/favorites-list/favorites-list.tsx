import { JSX } from 'react';
import PlaceCard from '../place-card/place-card';
import { Offers, } from '../../types/offers.ts';
import { PageType } from '../../const.ts';

type FavoritesListProps = {
  favoriteOffersByGroup: Partial<Record<string, Offers>>;
};

function FavoritesList({ favoriteOffersByGroup }: FavoritesListProps): JSX.Element {

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
