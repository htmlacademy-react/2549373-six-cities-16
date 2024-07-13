import {JSX} from 'react';
import PlaceCard from '../place-card/place-card';
import {Cities} from '../../constants';
import {OfferData} from '../../types/types';

type Props = {
  offers: OfferData[];
}

function PlacesList({offers}: Props): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.filter((offer: OfferData) => offer.city.name === Cities.Amsterdam).slice(0, 5).map((offer: OfferData) =>
        <PlaceCard key={offer.id} offer={offer}/>)}
    </div>
  );
}

export default PlacesList;
