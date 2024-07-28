import { MutableRefObject, useEffect, useRef, useState } from 'react';
import leaflet from 'leaflet';
import { City } from '../../types/city.ts';

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
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
          {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
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
