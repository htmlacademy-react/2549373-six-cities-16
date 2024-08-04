import {JSX, useEffect, useRef} from 'react';
import 'leaflet/dist/leaflet.css';
import { OfferType, FullOffer } from '../../types/offers.ts';
import useMap from '../../hooks/use-map/use-map.tsx';
import leaflet from 'leaflet';
import {Nullable} from '../../types/globals.ts';
import { UrlMarker } from '../../const.ts';

type MapProps = {
  oneCityOffers: (OfferType | FullOffer)[];
  selectedOffer: Nullable<OfferType | FullOffer>;
  className: string;
}

const defaultCustomIcon = leaflet.icon({
  iconUrl: UrlMarker.DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});
const currentCustomIcon = leaflet.icon({
  iconUrl: UrlMarker.CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function Map({ oneCityOffers, selectedOffer, className }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const { city } = oneCityOffers[0];
  const map = useMap(mapRef, city);

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
    <section className={`map ${className}__map`} ref={mapRef}></section>
  );
}

export default Map;
