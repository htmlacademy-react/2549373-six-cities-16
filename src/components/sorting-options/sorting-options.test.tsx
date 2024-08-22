import { render, screen, fireEvent } from '@testing-library/react';
import SortingOptions from './sorting-options';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setSortOption } from '../../store/slices/offers/offers';
import { vi } from 'vitest';
import { SortOptionValue } from '../../const';

vi.mock('../../hooks', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

describe('Component: SortingOptions', () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    vi.mocked(useAppDispatch).mockReturnValue(mockDispatch);
    vi.mocked(useAppSelector).mockReturnValue(SortOptionValue.Popular);
  });

  it('should render the SortingOptions component correctly', () => {
    render(<SortingOptions />);
    expect(screen.getByTestId(SortOptionValue.Popular)).toBeInTheDocument();
  });

  it('should open and close the sort options list on click', () => {
    render(<SortingOptions />);
    const sortType = screen.getByTestId('sorting-type');
    fireEvent.click(sortType);
    expect(screen.getByRole('list')).toHaveClass('places__options--opened');
    fireEvent.click(sortType);
    expect(screen.getByRole('list')).not.toHaveClass('places__options--opened');
  });

  it('should dispatch setSortOption when a sort option is clicked', () => {
    render(<SortingOptions />);
    fireEvent.click(screen.getByTestId('sorting-type'));
    fireEvent.click(screen.getByTestId(SortOptionValue.PriceLowToHigh));
    expect(mockDispatch).toHaveBeenCalledWith(setSortOption(SortOptionValue.PriceLowToHigh));
  });

  it('should highlight the active sort option correctly', () => {
    render(<SortingOptions />);
    const activeOption = screen.getByTestId(SortOptionValue.Popular);
    expect(activeOption).toHaveClass('places__option--active');
  });
});
