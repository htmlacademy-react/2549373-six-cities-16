import { render, waitFor } from '@testing-library/react';
import PageTitle from './page-title';
import { withHistory } from '../../utils/mock-component';

describe('Component: PageTitle', () => {
  beforeEach(() => {
    document.title = '';
  });

  it('should render the page title correctly', async () => {
    const testTitle = 'Test Page Title';

    const withHistoryComponent = withHistory(<PageTitle title={testTitle}/>);

    render(withHistoryComponent);

    await waitFor(() => {
      expect(document.title).toBe(testTitle);
    });
  });

  it('should render an empty title by default', async () => {
    const withHistoryComponent = withHistory(<PageTitle />);

    render(withHistoryComponent);

    await waitFor(() => {
      expect(document.title).toBe('');
    });
  });
});
