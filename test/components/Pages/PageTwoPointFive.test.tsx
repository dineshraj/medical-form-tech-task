import { zodResolver } from '@hookform/resolvers/zod';
import { waitFor, within } from '@testing-library/dom';
import { render, screen } from '@testing-library/react';
import { ReactElement, ReactNode } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { MemoryRouter } from 'react-router-dom';
import PageTwoPointFive from '../../../src/components/Pages/PageTwoPointFive';
import { PageTwoPointFiveSchema } from '../../../src/lib/schema';
import { vi } from 'vitest';
import userEvent, { UserEvent } from '@testing-library/user-event';
import { FORM_KEY } from '../../../src/App';

const mockNavigate = vi.fn();

vi.mock('react-router', async () => {
  const original = await vi.importActual('react-router');
  return {
    ...original,
    useNavigate: () => mockNavigate
  };
});

vi.mock('../../../src/data/index.ts', () => {
  return {
    childSymptomsType: [
      {
        name: 'General retardation',
        symptoms: ['Being too slow', 'Cannot handle basic logic']
      },
      {
        name: 'Communication issues',
        symptoms: ['Unable to command the English language', 'Being too vague']
      }
    ]
  };
});

const renderWithReactHookForm = (ui: ReactElement) => {
  const Wrapper = ({ children }: { children: ReactNode }) => {
    const methods = useForm({
      mode: 'onChange',
      resolver: zodResolver(PageTwoPointFiveSchema)
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
  renderWithReactHookForm(<PageTwoPointFive />);
};

const existingData = {
  [FORM_KEY]: {
    name: 'Chloe',
    symptomItem: ['General retardation', 'Communication issues']
  }
};

const fillInFormCorrectly = async (user: UserEvent) => {
  const symptomItem = (await screen.findAllByTestId(
    'detail-item'
  )) as HTMLInputElement[];

  const firstLabel = within(symptomItem[0]).getByTestId('detailItem0-label');
  await user.click(firstLabel);
};

describe('PageTwoPointFive', () => {
  beforeEach(() => {
    localStorage.getItem = vi.fn().mockImplementation(() => {
      return JSON.stringify(existingData[FORM_KEY]);
    });
  });

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
    it('renders the title with the name and first symptom in lowercase', async () => {
      renderApp();

      const title = await screen.findByRole('heading', { level: 1 });

      expect(title).toHaveTextContent(
        "Tell us more about Chloe's general retardation"
      );
    });
  });

  describe('Details list', () => {
    it('renders the details list', async () => {
      renderApp();

      await waitFor(() => {
        const list = screen.queryByTestId('details-list');

        expect(list).toBeInTheDocument();
      });
    });

    it('goes to the next list if there is another symptom', async () => {
      const user = userEvent.setup();
      renderApp();

      let title = await screen.findByRole('heading', { level: 1 });

      expect(title).toHaveTextContent(
        "Tell us more about Chloe's general retardation"
      );

      const input = screen.getByText('Being too slow');
      await user.click(input);
      const nextButton = screen.getByTestId('next-button-page-25');
      await user.click(nextButton);
      title = await screen.findByRole('heading', { level: 1 });

      expect(title).toHaveTextContent(
        "Tell us more about Chloe's communication issues"
      );
    });

    // it('goes to the next "proper" page if there are no more symptoms', () => {});
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

    it.skip('calls navigate() with the right url if at the end of the symptom list', async () => {
      // const user = userEvent.setup();
      // renderApp();
      // await fillInFormCorrectly(user);
      // const nextButton = await screen.findByTestId('next-button-page-25');
      // expect(nextButton).toBeInTheDocument();
      // await user.click(nextButton);
      // expect(mockNavigate).toHaveBeenCalledWith('/details');
    });
  });
});
