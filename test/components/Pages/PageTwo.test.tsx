import { zodResolver } from '@hookform/resolvers/zod';
import { render, screen, within } from '@testing-library/react';
import { ReactElement, ReactNode } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { MemoryRouter } from 'react-router-dom';
import PageTwo from '../../../src/components/Pages//PageTwo';
import PageOneSchema from '../../../src/lib/schema';

const renderWithReactHookForm = (ui: ReactElement) => {
  const Wrapper = ({ children }: { children: ReactNode }) => {
    const methods = useForm({
      mode: 'onChange',
      resolver: zodResolver(PageOneSchema)
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
  describe('Progress bar', () => {
    it('renders the progress bar with the first bar highlighted', async () => {
      renderApp();

      const progressBar = await screen.findByTestId('progress-bar');
      const progressBarItems =
        within(progressBar).queryAllByTestId('progress-bar__item');

      expect(progressBarItems[0]).toHaveAttribute(
        'style',
        'background-color: rgb(242, 242, 242);'
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
});
