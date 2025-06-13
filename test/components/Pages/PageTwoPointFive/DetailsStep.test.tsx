import { render, screen } from '@testing-library/react';
import DetailsStep from '../../../../src/components/Pages/PageTwoPointFive/DetailsStep';
import { ReactElement, ReactNode } from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { vi } from 'vitest';

describe('DetailsStep', () => {
  // TODO is this what I need for this file too?
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

  const renderComponent = (mockData: {
    childName: string;
    symptomDetails: { name: string; symptoms: string[] };
    submitHandler: SubmitHandler<{ detailsItem: string[] }>;
  }) => {
    renderWithReactHookForm(<DetailsStep {...mockData} />);
  };

  it('renders the list', async () => {
    const mockSymptomDetails = {
      name: 'Disabled',
      symptoms: ['Does not talk much']
    };
    renderComponent({
      childName: 'Dreo',
      symptomDetails: mockSymptomDetails,
      submitHandler: vi.fn()
    });

    const detailList = await screen.findByTestId('details-list');

    expect(detailList).toBeInTheDocument();
  });
});
