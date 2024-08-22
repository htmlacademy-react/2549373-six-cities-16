import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withHistory, withStore } from '../../utils/mock-component';
import { generateMockFullOffer, makeFakeStore } from '../../utils/moks';
import CommentForm from './comment-form';
import { createMemoryHistory } from 'history';
import { AppRoute, AuthStatus } from '../../const';
import authSlice, { AuthInitialState } from '../../store/slices/auth/auth';
import offerSlice, { OfferInitialState } from '../../store/slices/offer/offer';

describe('Component: CommentForm', () => {
  const mockHistory = createMemoryHistory();
  const mockOffer = generateMockFullOffer();
  const offerId = mockOffer.id;

  it('should render form elements and disable submit button when form is not complete', () => {
    const withHistoryComponent = withHistory(<CommentForm />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        [authSlice.name]: { authorizationStatus: AuthStatus.Auth } as AuthInitialState,
        [offerSlice.name]: { offer: mockOffer } as OfferInitialState,
      })
    );

    mockHistory.push(`${AppRoute.Offer}/${offerId}`);
    render(withStoreComponent);

    expect(screen.getByTestId('comment-form')).toBeInTheDocument();
    expect(screen.getByTestId('textarea')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeDisabled();
  });

  it('should enable submit button when form is correctly filled', async () => {
    const withHistoryComponent = withHistory(<CommentForm />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore({
        [authSlice.name]: { authorizationStatus: AuthStatus.Auth } as AuthInitialState,
        [offerSlice.name]: { offer: mockOffer } as OfferInitialState,
      })
    );

    mockHistory.push(`${AppRoute.Offer}/${offerId}`);
    render(withStoreComponent);

    await act(async () => {
      const ratingInput = screen.getByTitle('perfect');
      const textarea = screen.getByTestId('textarea');

      await userEvent.type(textarea, 'This is a great place to stay, I had a wonderful experience!');
      await userEvent.click(ratingInput);
    });

    const submitButton = screen.getByTestId('submit-button');
    expect(submitButton).toBeEnabled();
  });
});
