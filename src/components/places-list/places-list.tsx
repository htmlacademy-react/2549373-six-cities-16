import { JSX } from 'react';
import PlaceCard from '../place-card/place-card';
import { Offers, OfferType } from '../../types/offers';
import { Nullable } from '../../types/globals';
import classNames from 'classnames';
import { PageType } from '../../const.ts';

type Props = {
  offers: Offers;
  onChangeCurrentOffer?: (offer: Nullable<OfferType>) => void;
  className: typeof PageType.CITIES | typeof PageType.NEAR_PLACES;
}

function PlacesList({ offers, onChangeCurrentOffer, className }: Props): JSX.Element {

  function handlerCurrentOffer(offer: Nullable<OfferType>) {
    if (offer) {
      if (!onChangeCurrentOffer) {
        return;
      }
      onChangeCurrentOffer(offer);
    } else {
      if (!onChangeCurrentOffer) {
        return;
      }
      onChangeCurrentOffer(null);
    }
  }

  const classWrapper = className === PageType.CITIES ? 'cities__places-list' : 'near-places__list';
  return (
    <div className={classNames(['places__list', classWrapper])}>
      {offers.map((offer: OfferType) =>
        <PlaceCard key={offer.id} offer={offer} onCurrentOfferChange={handlerCurrentOffer} className={className}/>)}
    </div>
  );
}

export default PlacesList;
