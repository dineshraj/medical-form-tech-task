import { render, screen } from '@testing-library/react';
import App from '../src/App';
import { MemoryRouter } from 'react-router-dom';

const renderApp = () => {
  return (
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
};

describe('App', () => {
  it('renders the app', () => {
    const app = render(renderApp());
    expect(app).not.toBeFalsy();
  });

  it('renders the main container', () => {
    render(renderApp());
    const container = screen.findByTestId('container');

    expect(container).toBeTruthy();
  });
});
