import { act, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Route, Routes } from 'react-router-dom';
import HistoryRouter from './history-route';

describe('HistoryRouter', () => {
  it('should render the children correctly', () => {
    const history = createMemoryHistory();
    history.push('/test-route');

    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route path="/test-route" element={<div>Test Route</div>}/>
        </Routes>
      </HistoryRouter>
    );

    expect(screen.getByText('Test Route')).toBeInTheDocument();
  });

  it('should update the location when history changes', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route path="/" element={<div>Home</div>}/>
          <Route path="/about" element={<div>About</div>}/>
        </Routes>
      </HistoryRouter>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();

    act(() => {
      history.push('/about');
    });

    expect(screen.getByText('About')).toBeInTheDocument();
  });
});
