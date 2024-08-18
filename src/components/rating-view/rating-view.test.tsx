import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import RatingView from './rating-view';

describe('RatingView Component', () => {
  it('should render the "Rating" text', () => {
    render(<RatingView rating={4.5}/>);
    expect(screen.getByText('Rating')).toBeInTheDocument();
  });

  it('should render stars with the correct width based on the rounded rating 4.5', () => {
    render(<RatingView rating={4.5}/>);
    const starsElement = screen.getByTestId('stars');
    expect(starsElement).toHaveStyle('width: 100%');
  });

  it('should render stars with the correct width based on the rounded rating 4.4', () => {
    render(<RatingView rating={4.4}/>);
    const starsElement = screen.getByTestId('stars');
    expect(starsElement).toHaveStyle('width: 80%');
  });
});
