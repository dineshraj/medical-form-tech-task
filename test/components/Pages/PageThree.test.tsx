// import { zodResolver } from "@hookform/resolvers/zod";
import { within } from "@testing-library/dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ReactElement, ReactNode } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { MemoryRouter } from "react-router";
import { vi } from "vitest";
import PageThree from "../../../src/components/Pages/PageThree";


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
      mode: 'onChange',
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
      const existingData = { name: 'Dineshraj' };

      localStorage.getItem = vi.fn().mockImplementation(() => {
        return JSON.stringify(existingData);
      });

      renderApp();

      const title = await screen.findByRole('heading', { level: 1 });

      expect(title).toHaveTextContent('Dineshraj needs help with...');
    });
  });

})