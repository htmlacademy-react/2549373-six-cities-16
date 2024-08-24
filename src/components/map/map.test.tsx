import { render, screen } from '@testing-library/react';
import Map from './map';
import { generateMockOffers, makeFakeStore } from '../../utils/moks';
import { PageType } from '../../const';
import { withStore } from '../../utils/mock-component';

describe('Component: Map', () => {
  const mockOffers = generateMockOffers(3);

  it('should render the map component correctly', () => {
    const { withStoreComponent } = withStore(<Map oneCityOffers={mockOffers} className={PageType.CITIES}/>, makeFakeStore());
    render(withStoreComponent);
    expect(screen.getByTestId('map')).toBeInTheDocument();
  });

  it('should render with correct className when PageType.CITIES is passed', () => {
    const { withStoreComponent } = withStore(<Map oneCityOffers={mockOffers} className={PageType.CITIES}/>, makeFakeStore());
    render(withStoreComponent);
    const mapElement = screen.getByTestId('map');
    expect(mapElement).toBeInTheDocument();
    expect(mapElement).toHaveClass(`${PageType.CITIES}__map`);
  });

  it('should render with correct className when PageType.OFFER is passed', () => {
    const { withStoreComponent } = withStore(<Map oneCityOffers={mockOffers} className={PageType.OFFER}/>, makeFakeStore());
    render(withStoreComponent);
    const mapElement = screen.getByTestId('map');
    expect(mapElement).toBeInTheDocument();
    expect(mapElement).toHaveClass(`${PageType.OFFER}__map`);
  });
});
