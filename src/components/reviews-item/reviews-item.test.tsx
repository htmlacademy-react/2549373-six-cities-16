import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { formatDate } from '../../utils/utils';
import { generateMockReview } from '../../utils/moks.ts';
import ReviewItem from './reviews-item.tsx';

describe('ReviewItem Component', () => {
  it('should render review information correctly', () => {
    const mockReview = generateMockReview();

    render(<ReviewItem review={mockReview} />);

    expect(screen.getByText(mockReview.user.name)).toBeInTheDocument();

    const avatarImage = screen.getByAltText('Reviews avatar');
    expect(avatarImage).toHaveAttribute('src', mockReview.user.avatarUrl);

    expect(screen.getByText(mockReview.comment)).toBeInTheDocument();

    const formattedDate = formatDate(mockReview.date);
    expect(screen.getByText(formattedDate)).toBeInTheDocument();
  });
});
