import { JSX} from 'react';
import PlaceCard from '../place-card/place-card';
import { Offer, Offers } from '../../types/offers';
import { Nullable } from '../../types/globals';

type Props = {
  offers: Offers;
  changeCurrentOffer: (offer: Nullable<Offer>) => void;
}

function PlacesList({ offers, changeCurrentOffer }: Props): JSX.Element {

  function handlerCurrentOffer(offer: Nullable<Offer>) {
    if (offer) {
      changeCurrentOffer({ ...offer });
    } else {
      changeCurrentOffer(null);
    }
  }

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer: Offer) =>
        <PlaceCard key={offer.id} offer={offer} isCities setCurrentOffer={handlerCurrentOffer} />)}
    </div>
  );
}

export default PlacesList;
