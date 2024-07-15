import { JSX, useState } from 'react';
import PlaceCard from '../place-card/place-card';
import { Cities } from '../../const';
import { Offer, Offers } from '../../types/offers';
import { Nullable } from '../../types/globals';

type Props = {
  offers: Offers;
}

function PlacesList({ offers }: Props): JSX.Element {
  const [, setCurrentOffer] = useState<Nullable<Offer>>(null);

  function handlerCurrentOffer(offer: Nullable<Offer>) {
    if (offer) {
      setCurrentOffer({ ...offer });
    } else {
      setCurrentOffer(null);
    }
  }

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.filter((offer: Offer) => offer.city.name === Cities.Amsterdam).slice(0, 5).map((offer: Offer) =>
        <PlaceCard key={offer.id} offer={offer} isCities setCurrentOffer={handlerCurrentOffer} />)}
    </div>
  );
}

export default PlacesList;
