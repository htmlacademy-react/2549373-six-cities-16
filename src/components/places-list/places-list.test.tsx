import { render, screen } from '@testing-library/react';
import { withHistory, withStore } from '../../utils/mock-component';
import PlacesList from './places-list';
import { AuthStatus, PageType } from '../../const';
import { generateMockOffers, makeFakeStore } from '../../utils/moks';
import authSlice, { AuthInitialState } from '../../store/slices/auth/auth';

describe('Component: PlacesList', () => {
  it('should apply the correct class for the CITIES page type', () => {
    const mockOffers = generateMockOffers(3);

    const withHistoryComponent = withHistory(<PlacesList offers={mockOffers} className={PageType.CITIES}/>);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      [authSlice.name]: { authorizationStatus: AuthStatus.Auth } as AuthInitialState,
    }));

    render(withStoreComponent);

    const placesList = screen.getByTestId('places-list');
    expect(placesList).toHaveClass('cities__places-list');
  });

  it('should apply the correct class for the NEAR_PLACES page type', () => {
    const mockOffers = generateMockOffers(2);

    const withHistoryComponent = withHistory(<PlacesList offers={mockOffers} className={PageType.NEAR_PLACES}/>);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      [authSlice.name]: { authorizationStatus: AuthStatus.Auth } as AuthInitialState,
    }));

    render(withStoreComponent);

    const placesList = screen.getByTestId('places-list');
    expect(placesList).toHaveClass('near-places__list');
  });

  it('should render the correct number of PlaceCard components', () => {
    const mockOffers = generateMockOffers(4);

    const withHistoryComponent = withHistory(<PlacesList offers={mockOffers} className={PageType.CITIES}/>);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore({
      [authSlice.name]: { authorizationStatus: AuthStatus.Auth } as AuthInitialState,
    }));

    render(withStoreComponent);

    const placesList = screen.getByTestId('places-list');
    expect(placesList.childNodes.length).toBe(4);
  });
});
