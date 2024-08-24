import * as Utils from '../../utils/utils';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import RandomCityLink from './random-city-link';
import { Cities } from '../../const';
import { BrowserRouter as Router } from 'react-router-dom';
import { getRandomCity } from '../../utils/utils';
import { CityLink } from '../../types/city';

vi.mock('../../utils/utils', async () => {
  const actualUtils = await vi.importActual<typeof Utils>('../../utils/utils');
  return {
    ...actualUtils,
    getRandomCity: vi.fn(),
  };
});

describe('Component: RandomCityLink', () => {
  it('should render the RandomCityLink component correctly with a random city', () => {
    const mockCity: CityLink = Cities.Paris;
    vi.mocked(getRandomCity).mockReturnValue(mockCity);

    render(
      <Router>
        <RandomCityLink />
      </Router>
    );

    expect(screen.getByText(mockCity.name)).toBeInTheDocument();
  });

  it('should render a link with the correct href based on the random city', () => {
    const mockCity: CityLink = Cities.Amsterdam;
    vi.mocked(getRandomCity).mockReturnValue(mockCity);

    render(
      <Router>
        <RandomCityLink />
      </Router>
    );

    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute('href', `/${mockCity.id}`);
  });

  it('should return a random city from the list', () => {
    const cityEntries: CityLink[] = Object.values(Cities);
    const randomCity = getRandomCity(cityEntries);
    expect(cityEntries).toContain(randomCity);
  });
});
