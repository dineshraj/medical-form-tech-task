import { vi } from 'vitest';
import { ReactElement, ReactNode } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { MemoryRouter } from 'react-router';

import { within } from '@testing-library/dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import PageThree from '../../../src/components/Pages/PageThree';
import { pageThree } from '../../../src/lib/lang';
import { FORM_KEY } from '../../../src/App';

const mockNavigate = vi.fn();

vi.mock('react-router', async () => {
  const original = await vi.importActual('react-router');
  return {
    ...original,
    useNavigate: () => mockNavigate
  };
});

const renderWithReactHookForm = (ui: ReactElement) => {
  const Wrapper = ({ children }: { children: ReactNode }) => {
    const methods = useForm({
      mode: 'onChange'
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
  renderWithReactHookForm(<PageThree />);
};

describe('PageThree', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
  });

  describe('Back button', () => {
    it('renders the next button wrapper and the button', async () => {
      renderApp();

      const backButtonWrapper = await screen.findByTestId(
        'back-button-wrapper'
      );
      const backButton = screen.queryByTestId('back-button');

      expect(backButtonWrapper).toBeVisible();
      expect(backButton).toBeVisible();
    });

    it('clicking the button goes back a page', async () => {
      const user = userEvent.setup();
      renderApp();

      const backButton = await screen.findByTestId('back-button');
      await user.click(backButton);

      expect(mockNavigate).toHaveBeenCalledWith(-1);
    });
  });

  describe('Progress bar', () => {
    it('renders the progress bar with the first two bars highlighted', async () => {
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
        'background-color: rgb(242, 242, 242);'
      );
    });
  });

  describe('title', () => {
    it('renders the title with the name the user provided', async () => {
      const existingData = { name: 'Dineshraj' };

      localStorage.getItem = vi.fn().mockImplementation(() => {
        return JSON.stringify(existingData);
      });

      renderApp();

      const title = await screen.findByRole('heading', { level: 1 });

      expect(title).toHaveTextContent(pageThree.title);
    });
  });

  describe('textarea', () => {
    it('renders the textarea', async () => {
      renderApp();

      const textarea = await screen.findByTestId('other-info');

      expect(textarea).toBeVisible();
    });
  });

  describe('Next button', () => {
    it('renders the next button as active by default', async () => {
      renderApp();

      const nextButton = await screen.findByTestId('next-button-page-3');

      expect(nextButton).toBeInTheDocument();
      expect(nextButton).not.toBeDisabled();
    });

    it('calls navigate() with the right url', async () => {
      const user = userEvent.setup();

      renderApp(); // child name
      const input = (await screen.findByTestId(
        'other-info'
      )) as HTMLInputElement;

      await user.type(input, 'anakin');

      const nextButton = await screen.findByTestId('next-button-page-3');
      expect(nextButton).toBeInTheDocument();

      await user.click(nextButton);

      expect(mockNavigate).toHaveBeenCalledWith('/appointment');
    });
  });

  describe('localStorage', () => {
    it('Adds data to local storage when the form is submitted with all fields', async () => {
      const user = userEvent.setup();

      renderApp();

      const input = (await screen.findByTestId(
        'other-info'
      )) as HTMLInputElement;

      await user.type(input, 'anakin');

      const nextButton = await screen.findByTestId('next-button-page-3');

      expect(nextButton).toBeInTheDocument();

      await user.click(nextButton);

      //TODO don't hardcode these
      const expectedData = {
        otherInfo: 'anakin'
      };

      expect(nextButton).not.toBeDisabled();
      expect(localStorage.setItem).toHaveBeenCalledWith(
        FORM_KEY,
        JSON.stringify(expectedData)
      );
    });
  });
});
