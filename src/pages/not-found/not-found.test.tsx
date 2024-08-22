import { render, screen } from '@testing-library/react';
import NotFound from './not-found';
import { Mock, vi } from 'vitest';
import { useAppDispatch } from '../../hooks';
import { withHistory, withStore } from '../../utils/mock-component';
import { makeFakeStore } from '../../utils/moks';
import { createMemoryHistory } from 'history';

vi.mock('../../hooks', () => ({
  useAppDispatch: vi.fn(),
}));

describe('Component: NotFound', () => {
  it('should render correctly', () => {
    const mockHistory = createMemoryHistory();
    const mockDispatch = vi.fn();
    (useAppDispatch as Mock).mockReturnValue(mockDispatch);
    const withHistoryComponent = withHistory(<NotFound />, mockHistory);
    const { withStoreComponent } = withStore(withHistoryComponent, makeFakeStore());

    render(withStoreComponent);

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Oops! Page not found')).toBeInTheDocument();
    expect(screen.getByText(/Возможно, страница, которую вы ищете/i)).toBeInTheDocument();

    const homeLink = screen.getByText('Go to Homepage');
    expect(homeLink).toBeInTheDocument();
  });
});
