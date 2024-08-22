import { MutableRefObject, useEffect, useRef, useState } from 'react';
import leaflet from 'leaflet';
import { City } from '../../types/city';

const TILE_LAYER_URL = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
const COPYRIGHT_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

function useMap(mapRef: MutableRefObject<null | HTMLDivElement>, city: City | null): leaflet.Map | null {
  const [map, setMap] = useState<null | leaflet.Map>(null);
  const isRenderedRef = useRef(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current && city !== null) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        zoom: city.location.zoom,
      });

      leaflet
        .tileLayer(
          TILE_LAYER_URL,
          {
            attribution: COPYRIGHT_ATTRIBUTION,
          },
        )
        .addTo(instance);

      setMap(instance);
      isRenderedRef.current = true;
    } else if (map !== null && city !== null) {
      map.setView(
        {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        city.location.zoom
      );
    }
  }, [mapRef, city, map]);

  return map;
}

export default useMap;
