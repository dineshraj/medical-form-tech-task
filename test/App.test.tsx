import { render, screen } from '@testing-library/react';
import App from '../src/App';

describe('App', () => {
  it('renders the app', () => {
    const app = render(<App />);
    expect(app).not.toBeFalsy();
  });

  it('renders the main container', () => {
    render(<App />);
    const container = screen.findByTestId('container');

    expect(container).toBeTruthy();
  });
});
