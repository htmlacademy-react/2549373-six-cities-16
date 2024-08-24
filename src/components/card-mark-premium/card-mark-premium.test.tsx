import { render } from '@testing-library/react';
import MarkCardPremium from './card-mark-premium';

describe('MarkCardPremium Component', () => {
  it('should render the text "Premium"', () => {
    const { getByText } = render(<MarkCardPremium/>);

    expect(getByText('Premium')).toBeInTheDocument();
  });
});

