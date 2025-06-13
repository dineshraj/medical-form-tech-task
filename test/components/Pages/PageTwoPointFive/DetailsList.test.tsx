import { render, screen } from '@testing-library/react';
import DetailsList from '../../../../src/components/Pages/PageTwoPointFive/DetailsList';
import { ReactElement, ReactNode } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

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

const mockSymptomDetails = [
  'Does not talk much',
  'Speech is not clear',
  'Does not understand requests',
  'Hard to understand what they are saying',
  'Stutters or stammers',
  'Other issue'
];

const renderComponent = () => {
  renderWithReactHookForm(
    <DetailsList symptomDetails={mockSymptomDetails} submitHandler={() => {}} />
  );
};

describe('PageThreeStep', () => {
  it('renders the provided symptom details', async () => {
    renderComponent();

    const symptomDetails = screen.findAllByTestId('detail-item');

    expect((await symptomDetails).length).toBe(6);
  });
});
