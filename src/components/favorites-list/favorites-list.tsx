import { JSX, useState } from 'react';
import PlaceCard from '../place-card/place-card';
import { Nullable } from '../../types/globals';
import { Offers, OfferType } from '../../types/offers.ts';
import { PageType } from '../../const.ts';

type FavoritesListProps = {
  favoriteOffersByGroup: Partial<Record<string, Offers>>;
};

function FavoritesList({ favoriteOffersByGroup }: FavoritesListProps): JSX.Element {
  const [, setCurrentOffer] = useState<Nullable<OfferType>>(null);

  function handlerCurrentOffer(offer: Nullable<OfferType>) {
    if (!offer) {
      setCurrentOffer(null);
    } else {
      setCurrentOffer({ ...offer });
    }
  }

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
                onCurrentOfferChange={handlerCurrentOffer}
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
