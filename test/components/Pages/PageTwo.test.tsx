import { render, screen, within } from '@testing-library/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { vi } from 'vitest';
import { useForm, FormProvider } from 'react-hook-form';
import { ReactElement, ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import userEvent, { UserEvent } from '@testing-library/user-event';
import { PageTwoSchema } from '../../../src/lib/schema';
import PageTwo from '../../../src/components/Pages//PageTwo';
import { FORM_KEY } from '../../../src/App';

const mockNavigate = vi.fn();

vi.mock('react-router', async () => {
  const original = await vi.importActual('react-router');
  return {
    ...original,
    useNavigate: () => mockNavigate
  };
});

const fillInFormCorrectly = async (user: UserEvent) => {
  const symptomItem = (await screen.findAllByTestId(
    'symptom-item'
  )) as HTMLInputElement[];

  const firstLabel = within(symptomItem[0]).getByTestId(
    'childSymptomsList01-label'
  );
  await user.click(firstLabel);
};

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
  renderWithReactHookForm(<PageTwo />);
};

describe('PageTwo', () => {
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
        'background-color: rgb(242, 242, 242);'
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

      expect(title).toHaveTextContent('Dineshraj needs help with...');
    });
  });

  describe('symptoms', () => {
    it('displays all the symptoms that are given', async () => {
      renderApp();
      const symptomList = await screen.findByTestId('symptom-list');
      const symptomItems = within(symptomList).getAllByTestId('symptom-item');

      expect(symptomList).toBeInTheDocument();
      expect(symptomItems[0]).toHaveTextContent('Speech and Communication');
      expect(symptomItems[1]).toHaveTextContent('Food and Nutrition');
    });
  });

  describe('Next button', () => {
    it('renders the next button as disabled by default', async () => {
      renderApp();

      const nextButton = await screen.findByTestId('next-button-page-25');

      expect(nextButton).toBeInTheDocument();
      expect(nextButton).toBeDisabled();
    });

    it('renders the next button as active when the correct values are entered for all required fields', async () => {
      const user = userEvent.setup();
      renderApp();

      await fillInFormCorrectly(user);

      const nextButton = await screen.findByTestId('next-button-page-25');

      expect(nextButton).toBeInTheDocument();
      expect(nextButton).not.toBeDisabled();
    });

    it('calls navigate() with the right url', async () => {
      const user = userEvent.setup();

      renderApp();
      await fillInFormCorrectly(user);

      const nextButton = await screen.findByTestId('next-button-page-25');
      expect(nextButton).toBeInTheDocument();

      await user.click(nextButton);

      expect(mockNavigate).toHaveBeenCalledWith('/details');
    });
  });

  describe('localStorage', () => {
    it('Adds data to local storage when the form is submitted with all fields', async () => {
      const user = userEvent.setup();

      // const existingData = { name: 'IShouldNotExist' };

      // localStorage.getItem = vi.fn().mockImplementationOnce(() => {
      //   return JSON.stringify(existingData);
      // });

      renderApp();
      await fillInFormCorrectly(user);

      const nextButton = await screen.findByTestId('next-button-page-25');

      expect(nextButton).toBeInTheDocument();

      await user.click(nextButton);

      //TODO don't hardcode these
      const expectedData = {
        symptomItem: ['Speech and Communication']
      };

      expect(nextButton).not.toBeDisabled();
      expect(localStorage.setItem).toHaveBeenCalledWith(
        FORM_KEY,
        JSON.stringify(expectedData)
      );
    });
  });
});
