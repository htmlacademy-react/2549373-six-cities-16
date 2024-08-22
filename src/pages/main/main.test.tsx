import { render, screen } from '@testing-library/react';
import Main from './main';
import { withStore, withHistory } from '../../utils/mock-component';
import { vi } from 'vitest';
import { generateMockOffers, makeFakeStore } from '../../utils/moks';
import { createMemoryHistory } from 'history';
import useSortedCityOffers from '../../hooks/use-sorted-city-offers/use-sorted-city-offers';

vi.mock('../../hooks/use-city-navigation/use-city-navigation', () => ({
  useCityNavigation: vi.fn(() => ({ isCityValid: true })),
}));

vi.mock('../../hooks/use-sorted-city-offers/use-sorted-city-offers');

describe('Component: Main', () => {
  const mockHistory = createMemoryHistory();

  it('should render offers list', () => {
    vi.mocked(useSortedCityOffers).mockReturnValue([]);

    const withHistoryComponent = withHistory(<Main />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());

    render(withStoreComponent);

    expect(screen.getByTestId('no-places')).toBeInTheDocument();
  });

  it('should render "No places to stay available" when there are no offers', () => {
    const mockOffers = generateMockOffers(3);
    vi.mocked(useSortedCityOffers).mockReturnValue(mockOffers);

    const withHistoryComponent = withHistory(<Main />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());

    render(withStoreComponent);

    expect(screen.getByTestId('places-found')).toBeInTheDocument();
  });
});
