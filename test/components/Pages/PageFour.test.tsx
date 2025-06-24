import { zodResolver } from '@hookform/resolvers/zod';
import { render, screen, within } from '@testing-library/react';
import { ReactElement, ReactNode } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import {
  datePlaceholderText,
  pageFour,
  timePlaceholderText
} from '../../../src/lib/lang';
import { PageFourSchema } from '../../../src/lib/schema';
import PageFour from '../../../src/components/Pages/PageFour';
import userEvent, { UserEvent } from '@testing-library/user-event';

const mockNavigate = vi.fn();

vi.mock('react-router', async () => {
  const original = await vi.importActual('react-router');
  return {
    ...original,
    useNavigate: () => mockNavigate
  };
});

const fillInFormCorrectly = async (user: UserEvent) => {
  // appointment date
  const appointmentLabel = await screen.findByTestId('appointment-label');
  const datePicker = within(appointmentLabel).queryByPlaceholderText(
    datePlaceholderText
  ) as unknown as HTMLElement;

  await user.click(datePicker);
  //TODO this is brittle if other options are on the page in the future
  await user.click(screen.getAllByRole('option')[27]);

  // appointment time
  const appointmentTimeLabel = await screen.findByTestId(
    'appointment-time-label'
  );
  const timePicker = within(appointmentTimeLabel).queryByPlaceholderText(
    timePlaceholderText
  ) as unknown as HTMLElement;

  await user.click(timePicker);
  //TODO this is brittle if the tests are run at a certain time
  await user.click(screen.getAllByRole('option')[87]);

  // call type
  const videoCall = screen.getByTestId('video-call')
  await user.click(videoCall);
};

const renderWithReactHookForm = (ui: ReactElement) => {
  const Wrapper = ({ children }: { children: ReactNode }) => {
    const methods = useForm({
      mode: 'onChange',
      resolver: zodResolver(PageFourSchema)
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

describe('PageFour', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
  });

  describe('Progress bar', () => {
    it('renders the progress bar with all the bars highlighted', async () => {
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
    it('renders the appointment label', async () => {
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
  });

  describe('Appointment date', () => {
    it('renders the time label', async () => {
      renderApp();
      const appDateLabel = await screen.findByTestId('appointment-label');

      expect(appDateLabel).toBeInTheDocument();
      expect(appDateLabel.textContent).toBe(pageFour.appointment);
    });

    it('renders the date picker library', async () => {
      renderApp();
      const callType = await screen.findByTestId('call-type');

      expect(callType).toBeInTheDocument();
    });
  });

  describe('Call Type', () => {
    it('renders the call type options', () => {});
  });

  describe('Next button', () => {
    it('renders the next button as disabled by default', async () => {
      renderApp();

      const nextButton = await screen.findByTestId('next-button-page-4');

      expect(nextButton).toBeInTheDocument();
      expect(nextButton).toBeDisabled();
    });

    it('renders the next button as active when the correct values are entered for all required fields', async () => {
      const user = userEvent.setup();
      renderApp();

      await fillInFormCorrectly(user);

      const nextButton = await screen.findByTestId('next-button-page-4');

      expect(nextButton).toBeInTheDocument();
      expect(nextButton).not.toBeDisabled();
    });

    it('calls navigate() with the right url', async () => {
      const user = userEvent.setup();
      renderApp();

      await fillInFormCorrectly(user);

      const nextButton = await screen.findByTestId('next-button-page-4');
      expect(nextButton).toBeInTheDocument();

      await user.click(nextButton);

      expect(mockNavigate).toHaveBeenCalledWith('/success');
    });
  });
});
