import { JSX } from 'react';
import { Offers } from '../../types/offers.ts';
import PlacesList from '../places-list/places-list.tsx';

type NearbyPlacesProps = {
  nearby: Offers;
}
function NearbyPlaces({ nearby }: NearbyPlacesProps): JSX.Element {
  return (
    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">Other places in the neighbourhood</h2>
        <PlacesList offers={nearby} className="near-places"/>
      </section>
    </div>
  );
}

export default NearbyPlaces;
