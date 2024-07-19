import { JSX} from 'react';
import PlaceCard from '../place-card/place-card';
import {Offers, OfferType} from '../../types/offers';
import { Nullable } from '../../types/globals';
import classNames from 'classnames';
import {CITIES, NEAR_PLACES} from '../../const.ts';

type Props = {
  offers: Offers;
  changeCurrentOffer: (offer: Nullable<OfferType>) => void;
  className: typeof CITIES | typeof NEAR_PLACES;
}

function PlacesList({ offers, changeCurrentOffer, className }: Props): JSX.Element {

  function handlerCurrentOffer(offer: Nullable<OfferType>) {
    if (offer) {
      changeCurrentOffer({ ...offer });
    } else {
      changeCurrentOffer(null);
    }
  }

  const classWrapper = className === CITIES ? 'cities__places-list' : 'near-places__list';
  return (
    <div className={classNames(['places__list', classWrapper])}>
      {offers.map((offer: OfferType) =>
        <PlaceCard key={offer.id} offer={offer} setCurrentOffer={handlerCurrentOffer} className={className} />)}
    </div>
  );
}

export default PlacesList;
