import {JSX, useEffect, useRef} from 'react';
import 'leaflet/dist/leaflet.css';
import {Offer, Offers} from '../../types/offers.ts';
import useMap from '../../hooks/useMap/useMap.tsx';
import leaflet from 'leaflet';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT} from '../../const.ts';
import {Nullable} from '../../types/globals.ts';

type MapProps = {
  oneCityOffers: Offers;
  selectedOffer: Nullable<Offer>;
}

function Map({oneCityOffers, selectedOffer}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const {city} = oneCityOffers[0];
  const map = useMap(mapRef, city);
  const defaultCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const currentCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_CURRENT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  useEffect(() => {
    if (map) {
      oneCityOffers.forEach((offer) => {
        leaflet
          .marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          }, {
            icon: (offer.id === selectedOffer?.id)
              ? currentCustomIcon
              : defaultCustomIcon,
          })
          .addTo(map);
      });
    }
  }, [map, oneCityOffers, selectedOffer]);

  return (
    <section className="cities__map map" ref={mapRef}></section>
  );
}

export default Map;
