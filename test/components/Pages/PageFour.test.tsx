import { zodResolver } from '@hookform/resolvers/zod';
import { render, screen, within } from '@testing-library/react';
import { ReactElement, ReactNode } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { datePlaceholderText, errorForDate, pageFour } from '../../../src/lib/lang';
import { PageTwoSchema } from '../../../src/lib/schema';
import PageFour from '../../../src/components/Pages/PageFour';
import userEvent from '@testing-library/user-event';

const renderWithReactHookForm = (ui: ReactElement) => {
  const Wrapper = ({ children }: { children: ReactNode }) => {
    const methods = useForm({
      mode: 'onChange',
      resolver: zodResolver(PageTwoSchema)
    });

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
  renderWithReactHookForm(<PageFour />);
};

describe('PageOne', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
  });

  describe('Progress bar', () => {
    it('renders the progress bar with the first bar highlighted', async () => {
      renderApp();

      const progressBar = await screen.findByTestId('progress-bar');
      const progressBarItems =
        within(progressBar).queryAllByTestId('progress-bar__item');

      expect(progressBarItems[0]).toHaveAttribute(
        'style',
        'background-color: rgb(118, 87, 191);'
      );
      expect(progressBarItems[1]).toHaveAttribute(
        'style',
        'background-color: rgb(118, 87, 191);'
      );
      expect(progressBarItems[2]).toHaveAttribute(
        'style',
        'background-color: rgb(118, 87, 191);'
      );
      expect(progressBarItems[3]).toHaveAttribute(
        'style',
        'background-color: rgb(118, 87, 191);'
      );
    });
  });

  describe('Back button', () => {
    it('renders the next button wrapper but not the button', async () => {
      renderApp();

      const backButtonWrapper = await screen.findByTestId(
        'back-button-wrapper'
      );
      const backButton = screen.queryByTestId('back-button');

      expect(backButtonWrapper).toBeInTheDocument();
      expect(backButton).not.toBeInTheDocument();
    });
  });

  describe('Title', () => {
    it('renders the title', async () => {
      renderApp();
      const title = await screen.findByRole('heading', { level: 1 });

      expect(title.textContent).toBe(pageFour.title);
    });
  });

    describe('Appointment date', () => {
    it('renders the date label', async () => {
      renderApp();
      const appDateLabel = await screen.findByTestId('appointment-label');

      expect(appDateLabel).toBeInTheDocument();
      expect(appDateLabel.textContent).toBe(pageFour.appointment);
    });

    it('renders the date picker library', async () => {
      renderApp();
      const datePickerLabel = await screen.findByTestId('appointment-label');

      const datePicker =
        within(datePickerLabel).queryByPlaceholderText(datePlaceholderText);

      expect(datePicker).toBeInTheDocument();
    });

    it.skip('shows error message when a future date is entered', async () => {
      const user = userEvent.setup();

      renderApp();

      const dateLabel = await screen.findByTestId('appointment-label');
      const dateInput = within(dateLabel).getByPlaceholderText(
        datePlaceholderText
      ) as HTMLInputElement;

      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      dateInput.value = tomorrow.toString();

      await user.type(dateInput, tomorrow.toString());

      expect(dateLabel).toHaveTextContent(errorForDate);
    });
  });
});
