import { render, screen, fireEvent } from '@testing-library/react';
import Rating from './rating';

describe('Component: Rating', () => {
  it('should render the Rating component correctly', () => {
    render(<Rating rating={null} onChange={vi.fn()} isDisabled={false} />);
    const stars = screen.getAllByRole('radio');
    expect(stars.length).toBe(5);
  });

  it('should call onChange with correct value when a star is clicked', () => {
    const handleChange = vi.fn();
    render(<Rating rating={null} onChange={handleChange} isDisabled={false} />);
    const starInput = screen.getByTitle('good');
    fireEvent.click(starInput);
    expect(handleChange).toHaveBeenCalledWith(4);
  });

  it('should display correct title for each star', () => {
    render(<Rating rating={null} onChange={vi.fn()} isDisabled={false} />);
    expect(screen.getByTitle('terribly')).toBeInTheDocument();
    expect(screen.getByTitle('badly')).toBeInTheDocument();
    expect(screen.getByTitle('not bad')).toBeInTheDocument();
    expect(screen.getByTitle('good')).toBeInTheDocument();
    expect(screen.getByTitle('perfect')).toBeInTheDocument();
  });

  it('should disable all stars when isDisabled is true', () => {
    render(<Rating rating={null} onChange={vi.fn()} isDisabled />);
    screen.getAllByRole('radio').forEach((star) => {
      expect(star).toBeDisabled();
    });
  });
});
