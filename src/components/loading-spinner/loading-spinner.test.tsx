import { render } from '@testing-library/react';
import LoadingSpinner from './loading-spinner.tsx';

describe('LoadingSpinner Component', () => {
  it('should render a spinner element', () => {
    const { getByTestId } = render(<LoadingSpinner />);
    expect(getByTestId('loading-spinner')).toBeInTheDocument();
  });
});
