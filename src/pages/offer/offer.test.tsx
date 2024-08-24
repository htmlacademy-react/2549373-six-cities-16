import { render, screen } from '@testing-library/react';
import Offer from './offer';
import { withHistory, withStore } from '../../utils/mock-component';
import { createMemoryHistory } from 'history';
import { AuthStatus, RequestStatus } from '../../const';
import { generateMockOfferDetails, makeFakeStore } from '../../utils/moks';
import authSlice, { AuthInitialState } from '../../store/slices/auth/auth';
import offerSlice, { OfferInitialState } from '../../store/slices/offer/offer';

describe('Component: Offer', () => {
  const mockOffer = generateMockOfferDetails();

  it('should render offer page correctly', () => {
    const mockHistory = createMemoryHistory();
    const withHistoryComponent = withHistory(<Offer />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        [authSlice.name]: { authorizationStatus: AuthStatus.NoAuth } as AuthInitialState,
        [offerSlice.name]: {
          offer: mockOffer.offer,
          nearby: mockOffer.nearby,
          errorMessage: null,
          requestStatus: RequestStatus.Success,
        } as OfferInitialState,
      })
    );

    render(withStoreComponent);

    expect(screen.getByTestId('offer')).toBeInTheDocument();
  });
});
