import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { withHistory, withStore } from '../../utils/mock-component';
import Logo from './logo';
import { makeFakeStore } from '../../utils/moks';

describe('Component: Logo', () => {
  it('should render logo with correct width and height', () => {
    const mockHistory = createMemoryHistory();
    const withHistoryComponent = withHistory(<Logo width="81" height="41" />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());

    render(withStoreComponent);
    const logo = screen.getByAltText(/6 cities logo/i);
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('width', '81');
    expect(logo).toHaveAttribute('height', '41');
  });

  it('should link to the main page', () => {
    const mockHistory = createMemoryHistory();
    const withHistoryComponent = withHistory(<Logo width="81" height="41" />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());

    render(withStoreComponent);
    const logoLink = screen.getByRole('link');
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', '/');
  });
});
