import { render, screen } from '@testing-library/react';
import { ReactElement, ReactNode } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { MemoryRouter } from 'react-router-dom';
import PageFive from '../../../src/components/Pages/PageFive';
import { pageFive } from '../../../src/lib/lang';
import { vi } from 'vitest';

const renderWithReactHookForm = (ui: ReactElement) => {
  const Wrapper = ({ children }: { children: ReactNode }) => {
    const methods = useForm();

    return (
      <MemoryRouter>
        <FormProvider {...methods}>{children}</FormProvider>
      </MemoryRouter>
    );
  };

  return {
    ...render(ui, { wrapper: Wrapper })
  };
};

const renderApp = () => {
  renderWithReactHookForm(<PageFive />);
};

describe('Page Five', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
  });

  it('renders the main image', async () => {
    renderApp();
    const image = await screen.findByTestId('success-image');

    expect(image).toBeVisible();
  });

  describe('items', () => {
    it('renders the title', async () => {
      renderApp();
      const title = await screen.findByRole('heading', { level: 1 });

      expect(title.textContent).toBe(pageFive.title);
    });

    it('renders the details list', async () => {
      renderApp();
      const list = await screen.findByTestId('appointment-info-list');

      expect(list).toBeVisible();
    });

    it.only('renders the dynamic data from local storage', async () => {
      const existingData = {
        name: 'Dineshraj',
        appointmentDate: '2025-06-27T22:00:00.000Z',
        appointmentTime: '2025-06-27T14:45:00.002Z',
        callType: 'audio call'
      };

      localStorage.getItem = vi.fn().mockImplementation(() => {
        return JSON.stringify(existingData);
      });

      renderApp();

      const date = await screen.findByTestId('appointment-info-list__date');
      const time = await screen.findByTestId('appointment-info-list__time');
      const type = await screen.findByTestId(
        'appointment-info-list__call-type'
      );

      expect(date).toHaveTextContent('27 June 2025');
      expect(time).toHaveTextContent('3:45 pm');
      expect(type).toHaveTextContent('audio call');
    });
  });
});
