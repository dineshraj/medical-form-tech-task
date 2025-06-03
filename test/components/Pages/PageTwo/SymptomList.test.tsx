import { render, screen } from '@testing-library/react';
import SymptomList from '../../../../src/components/Pages/PageTwo/Symptoms/SymptomList';
import { ReactElement, ReactNode } from 'react';
import { useForm, FormProvider } from 'react-hook-form';

const mockData = [
  {
    id: 'childSymptomsList01',
    icon: 'symptoms01',
    name: 'Speech and Communication',
    info: 'Difficulty in speaking, stutters, stammers...'
  },
  {
    id: 'childSymptomsList02',
    icon: 'symptoms02',
    name: 'Food and Nutrition',
    info: 'Underweight child, food allergies, picky eater...'
  },
  {
    id: 'childSymptomsList03',
    icon: 'symptoms03',
    name: 'Developmental Issues',
    info: 'Premature birth, ADHD, Autism...'
  }
];

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

const renderComponent = () => {
  renderWithReactHookForm(<SymptomList data={mockData} />);
};

describe('SymptomList', () => {

  it('renders nothing if no data is provided', async () => {
    render(<SymptomList data={[]} />);

    const symptomList = await screen.findByTestId('symptom-list');
    const symptomItem = screen.queryAllByTestId('symptom-item');

    expect(symptomList).toBeInTheDocument();
    expect(symptomItem).toHaveLength(0);
  });

  it('renders all the provided data', async () => {
    // render(<SymptomList data={mockData} />);
    renderComponent();

    const symptomList = await screen.findByTestId('symptom-list');
    const symptomItem = await screen.findAllByTestId('symptom-item');

    expect(symptomList).toBeInTheDocument();
    expect(symptomItem).toHaveLength(3);
  });
});
