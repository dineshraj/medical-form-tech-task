import { zodResolver } from '@hookform/resolvers/zod';
import { render, screen, within } from '@testing-library/react';
import { ReactElement, ReactNode } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { MemoryRouter } from 'react-router-dom';
import PageTwo from '../../../src/components/Pages//PageTwo';
import { PageOneSchema, PageOneT } from '../../../src/lib/schema';
import userEvent, { UserEvent } from '@testing-library/user-event';

const fillInFormCorrectly = async (user: UserEvent) => {
  const listItems = (await screen.findAllByTestId(
    'symptom-item'
  )) as HTMLInputElement[];

  await user.type(listItems[0], 'anakin');
};

const renderWithReactHookForm = (
  ui: ReactElement,
  { defaultValues }: { defaultValues: PageOneT }
) => {
  const Wrapper = ({ children }: { children: ReactNode }) => {
    const methods = useForm({
      mode: 'onChange',
      resolver: zodResolver(PageOneSchema),
      defaultValues
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
  renderWithReactHookForm(<PageTwo />, {
    defaultValues: {
      name: 'Dineshraj'
    } as unknown as PageOneT
  });
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
    it('renders the title with the name the user provided', async () => {
      renderApp();
      const title = await screen.findByRole('heading', { level: 1 });

      expect(title).toHaveTextContent('Dineshraj needs help with...');
    });
  });

  describe('symptoms', () => {
    it('displays all the symptoms that are given', async () => {
      renderApp();
      const symptomList = await screen.findByTestId('symptom-list');

      expect(symptomList).toBeInTheDocument();
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
