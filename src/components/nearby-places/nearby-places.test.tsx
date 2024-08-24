import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { withHistory, withStore } from '../../utils/mock-component';
import NearbyPlaces from './nearby-places';
import { makeFakeStore, generateMockOffers } from '../../utils/moks';
import { AuthStatus } from '../../const';
import authSlice, { AuthInitialState } from '../../store/slices/auth/auth';

const mockNearbyOffers = generateMockOffers(3);

describe('Component: NearbyPlaces', () => {
  it('should correctly render nearby offers', () => {
    const mockHistory = createMemoryHistory();
    mockHistory.push('/');

    const withHistoryComponent = withHistory(<NearbyPlaces nearby={mockNearbyOffers} />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        [authSlice.name]: { authorizationStatus: AuthStatus.Auth } as AuthInitialState,
      })
    );

    render(withStoreComponent);

    expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();

    mockNearbyOffers.forEach((offer) => {
      expect(screen.getByText(offer.title)).toBeInTheDocument();
    });
  });

  it('should correctly render without nearby offers', () => {
    const mockHistory = createMemoryHistory();
    mockHistory.push('/');

    const withHistoryComponent = withHistory(<NearbyPlaces nearby={[]} />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        [authSlice.name]: { authorizationStatus: AuthStatus.Auth } as AuthInitialState,
      })
    );

    render(withStoreComponent);

    expect(screen.getByText(/Other places in the neighbourhood/i)).toBeInTheDocument();
  });
});
