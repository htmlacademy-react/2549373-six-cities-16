import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { formatDate } from '../../utils/utils';
import { generateMockReview } from '../../utils/moks';
import ReviewItem from './reviews-item';

describe('ReviewItem Component', () => {
  const mockReview = generateMockReview();

  it('should render the user name correctly', () => {
    render(<ReviewItem review={mockReview} />);
    expect(screen.getByText(mockReview.user.name)).toBeInTheDocument();
  });

  it('should render the avatar with the correct src attribute', () => {
    render(<ReviewItem review={mockReview} />);
    const avatarImage = screen.getByAltText('Reviews avatar');
    expect(avatarImage).toHaveAttribute('src', mockReview.user.avatarUrl);
  });

  it('should render the comment correctly', () => {
    render(<ReviewItem review={mockReview} />);
    expect(screen.getByText(mockReview.comment)).toBeInTheDocument();
  });

  it('should render the formatted date correctly', () => {
    render(<ReviewItem review={mockReview} />);
    const formattedDate = formatDate(mockReview.date);
    expect(screen.getByText(formattedDate)).toBeInTheDocument();
  });
});
