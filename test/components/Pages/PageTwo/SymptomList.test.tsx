import { render, screen } from '@testing-library/react';
import SymptomList from '../../../../src/components/Pages/PageTwo/Symptoms/SymptomList';
import { vi, vitest } from 'vitest';

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

describe('SymptomList', () => {
  beforeEach(() => {
    vitest.mock('react-hook-form', () => {
      return {
        useFormContext: vi.fn().mockReturnValue({
          register: vi.fn()
        })
      };
    });
  });

  afterEach(() => {
    vitest.restoreAllMocks();
  });
  it('renders all the provided data', async () => {
    render(<SymptomList data={mockData} />);

    const symptomList = await screen.findByTestId('symptom-list');
    const symptomItem = await screen.findAllByTestId('symptom-item');

    expect(symptomList).toBeInTheDocument();
    expect(symptomItem).toHaveLength(3);
  });
});
