import { render } from '@testing-library/react';
import App from '../src/App';

describe('App', () => {
  it('renders the app', () => {
    const app = render(<App />);
    expect(app).not.toBeFalsy();
  });
});
