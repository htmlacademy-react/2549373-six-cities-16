import {JSX} from 'react';
import PlaceCard from '../place-card/place-card';
import {Offer} from '../../mocks/offers';
import {Cities} from '../../constants';

type Props = {
  offers: Offer[];
}

function PlacesList({offers}: Props): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.filter((offer: Offer) => offer.city.name === Cities.Amsterdam).slice(0, 5).map((offer: Offer) =>
        <PlaceCard key={offer.id} offer={offer}/>)}
    </div>
  );
}

export default PlacesList;
