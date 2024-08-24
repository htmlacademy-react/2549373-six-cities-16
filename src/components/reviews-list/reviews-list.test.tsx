import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ReviewsList from './reviews-list';
import { generateMockReviews } from '../../utils/moks';

describe('ReviewsList Component', () => {
  it('should render the correct number of reviews', () => {
    const mockReviews = generateMockReviews(5);

    render(<ReviewsList reviews={mockReviews} />);

    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText(`${mockReviews.length}`)).toBeInTheDocument();

    const reviewItems = screen.getAllByRole('listitem');
    expect(reviewItems.length).toBe(mockReviews.length);
  });

  it('should render a maximum of 10 reviews', () => {
    const mockReviews = generateMockReviews(15);

    render(<ReviewsList reviews={mockReviews} />);

    const reviewItems = screen.getAllByRole('listitem');
    expect(reviewItems.length).toBe(10);
  });
});
