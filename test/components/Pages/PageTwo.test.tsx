import { zodResolver } from '@hookform/resolvers/zod';
import { render, screen, within } from '@testing-library/react';
import { ReactElement, ReactNode } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { MemoryRouter } from 'react-router-dom';
import PageTwo from '../../../src/components/Pages//PageTwo';
import { PageTwoSchema, PageTwoT } from '../../../src/lib/schema';
import userEvent, { UserEvent } from '@testing-library/user-event';
import { FORM_KEY } from '../../../src/App';
import { vi, vitest } from 'vitest';

const fillInFormCorrectly = async (user: UserEvent) => {
  const symptomItem = (await screen.findAllByTestId(
    'symptom-item'
  )) as HTMLInputElement[];

  await user.click(symptomItem[0]);
};

const renderWithReactHookForm = (
  ui: ReactElement
) => {
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

describe.only('PageTwo', () => {
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
  });
  describe('Progress bar', () => {
    it('renders the progress bar with the first two bars highlighted', async () => {
      renderApp();

      const progressBar = await screen.findByTestId('progress-bar');
      const progressBarItems =
        within(progressBar).queryAllByTestId('progress-bar__item');

      expect(progressBarItems[1]).toHaveAttribute(
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
    beforeEach(() => {
      localStorage.setItem(FORM_KEY, JSON.stringify({ name: 'Dineshraj' }));
    });

    afterEach(() => {
      vitest.restoreAllMocks();
    });

    it('renders the title with the name the user provided', async () => {
      renderApp();

      const existingData = { name: 'Dineshraj' };

      localStorage.getItem = vi.fn().mockImplementationOnce(() => {
        return JSON.stringify(existingData);
      });
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

      const nextButton = await screen.findByTestId('next-button-page-2');

      expect(nextButton).toBeInTheDocument();
      expect(nextButton).toBeDisabled();
    });

    it('renders the next button as active when the correct values are entered for all required fields', async () => {
      const user = userEvent.setup();
      renderApp();

      await fillInFormCorrectly(user);

      const nextButton = await screen.findByTestId('next-button-page-2');

      expect(nextButton).toBeInTheDocument();
      expect(nextButton).not.toBeDisabled();
    });
  });
});
