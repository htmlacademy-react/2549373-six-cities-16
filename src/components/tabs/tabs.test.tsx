import { screen } from '@testing-library/react';
import Tabs from './tabs';
import { useParams } from 'react-router-dom';
import { vi } from 'vitest';
import { Cities } from '../../const';
import { renderWithBrowserRouter } from '../../utils/mock-component';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useParams: vi.fn(),
  };
});

describe('Component: Tabs', () => {
  it('should render the Tabs component correctly', () => {
    vi.mocked(useParams).mockReturnValue({ cityId: Cities.Paris.id });
    renderWithBrowserRouter(<Tabs />);
    Object.values(Cities).forEach((city) => {
      expect(screen.getByText(city.name)).toBeInTheDocument();
    });
  });

  it('should correctly highlight the active city', () => {
    vi.mocked(useParams).mockReturnValue({ cityId: Cities.Amsterdam.id });
    renderWithBrowserRouter(<Tabs />);
    const activeCity = screen.getByText(Cities.Amsterdam.name);
    expect(activeCity.closest('a')).toHaveClass('tabs__item--active');
  });

  it('should render with Paris as the default city if no cityId is provided', () => {
    vi.mocked(useParams).mockReturnValue({});
    renderWithBrowserRouter(<Tabs />);
    const defaultCity = screen.getByText(Cities.Paris.name);
    expect(defaultCity.closest('a')).toHaveClass('tabs__item--active');
  });
});
