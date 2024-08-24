import { renderHook } from '@testing-library/react';
import { MutableRefObject } from 'react';
import leaflet from 'leaflet';
import { vi } from 'vitest';
import useMap from './use-map';
import { generateMockCity } from '../../utils/moks';

vi.mock('leaflet', async () => {
  const actual = await vi.importActual<typeof import('leaflet')>('leaflet');
  return {
    ...actual,
    map: vi.fn(() => ({
      setView: vi.fn(),
    })),
    tileLayer: vi.fn(() => ({
      addTo: vi.fn(),
    })),
  };
});

describe('useMap', () => {
  const mockMapRef = { current: document.createElement('div') } as MutableRefObject<HTMLDivElement>;
  const mockCity = generateMockCity();

  const mapSpy = vi.spyOn(leaflet, 'map');

  it('should create a map instance when mapRef is not null and city is provided', () => {
    renderHook(() => useMap(mockMapRef, mockCity));
    expect(mapSpy).toHaveBeenCalledWith(mockMapRef.current, {
      center: {
        lat: mockCity.location.latitude,
        lng: mockCity.location.longitude,
      },
      zoom: mockCity.location.zoom,
    });
  });

  it('should update the map view when the city changes', () => {
    const mockMapInstance = {
      setView: vi.fn(),
      addLayer: vi.fn(),
    } as unknown as leaflet.Map;
    mapSpy.mockReturnValue(mockMapInstance);

    const { rerender } = renderHook(({ city }) => useMap(mockMapRef, city), {
      initialProps: { city: mockCity },
    });

    const newCity = generateMockCity();
    rerender({ city: newCity });

    expect(mockMapInstance.setView).toHaveBeenCalledWith(
      {
        lat: newCity.location.latitude,
        lng: newCity.location.longitude,
      },
      newCity.location.zoom
    );
  });
});
