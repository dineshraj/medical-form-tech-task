import { render, screen } from '@testing-library/react';
import DetailsItem from '../../../../src/components/Pages/PageTwoPointFive/DetailsItem';
// import { vitest, vi } from 'vitest';
import { ReactElement, ReactNode } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

describe('DetailsItem.tsx', () => {
  const renderWithReactHookForm = (ui: ReactElement) => {
    const Wrapper = ({ children }: { children: ReactNode }) => {
      const methods = useForm({
        mode: 'onChange'
      });

      return <FormProvider {...methods}>{children}</FormProvider>;
    };

    return {
      ...render(ui, { wrapper: Wrapper })
    };
  };

  const renderComponent = (mockData: { detail: string; index: number }) => {
    renderWithReactHookForm(<DetailsItem {...mockData} />);
  };

  it('renders the list item based on the input', async () => {
    const detailString = 'Penis is too small';
    // render(<DetailsItem index={0} detail={detailString} />);
    renderComponent({ index: 0, detail: detailString });

    const listItem = await screen.findByTestId('detail-item');
    expect(listItem).toHaveTextContent(detailString);
    const icon = screen.getByTestId('icon');
    expect(icon).toHaveAttribute('class', 'detail-item__icon');
  });
});
