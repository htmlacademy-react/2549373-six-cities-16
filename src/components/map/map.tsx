import { JSX, useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import { FullOffer, OfferType } from '../../types/offers';
import useMap from '../../hooks/use-map/use-map';
import leaflet, { layerGroup, Marker } from 'leaflet';
import { UrlMarker } from '../../const';
import { useAppSelector } from '../../hooks';
import { State } from '../../types/state';

type MapProps = {
  oneCityOffers: (OfferType | FullOffer)[];
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

function Map({ oneCityOffers, className }: MapProps): JSX.Element {
  const selectedOffer = useAppSelector((state: State) => state.offers.currentOffer);
  const mapRef = useRef(null);
  const { city } = oneCityOffers[0];
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);

      oneCityOffers.forEach((offer) => {
        const marker = new Marker(
          {
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          },
          {
            icon:
              selectedOffer && offer.id === selectedOffer.id
                ? currentCustomIcon
                : defaultCustomIcon,
          }
        );

        marker.addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, oneCityOffers, selectedOffer]);

  return (
    <section className={`map ${className}__map`} ref={mapRef} data-testid="map"></section>
  );
}

export default Map;
