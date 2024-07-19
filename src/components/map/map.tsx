import {JSX, useEffect, useRef} from 'react';
import 'leaflet/dist/leaflet.css';
import {OfferType, Offers} from '../../types/offers.ts';
import useMap from '../../hooks/useMap/useMap.tsx';
import leaflet from 'leaflet';
import {URL_MARKER_CURRENT, URL_MARKER_DEFAULT} from '../../const.ts';
import {Nullable} from '../../types/globals.ts';

type MapProps = {
  oneCityOffers: Offers;
  selectedOffer: Nullable<OfferType>;
  className: string;
}

function Map({ oneCityOffers, selectedOffer, className }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const { city } = oneCityOffers[0];
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
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
    <section className={`map ${className}__map`} ref={mapRef}></section>
  );
}

export default Map;
