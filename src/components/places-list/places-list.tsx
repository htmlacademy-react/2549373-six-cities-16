import { JSX } from 'react';
import PlaceCard from '../place-card/place-card';
import { Offers, OfferType } from '../../types/offers';
import classNames from 'classnames';
import { PageType } from '../../const.ts';

type Props = {
  offers: Offers;
  className: typeof PageType.CITIES | typeof PageType.NEAR_PLACES;
}

function PlacesList({ offers, className }: Props): JSX.Element {
  const classWrapper = className === PageType.CITIES ? 'cities__places-list' : 'near-places__list';
  return (
    <div className={classNames(['places__list', classWrapper])}>
      {offers.map((offer: OfferType) =>
        <PlaceCard key={offer.id} offer={offer} className={className}/>)}
    </div>
  );
}

export default PlacesList;
