import { render, screen } from '@testing-library/react';
import IsThisChildAFatty from '../../../../src/components/Pages/PageOne/IsThisChildAFatty';
import { UseFormRegisterReturn, FieldErrors, FieldValues } from 'react-hook-form';
import { vitest } from 'vitest';


const registeredMock = vitest.fn() as unknown as UseFormRegisterReturn<'weight'>;
const unitRegisteredMock = vitest.fn() as unknown as UseFormRegisterReturn<'weightUnit'>;
const errorsMock = vitest.fn() as unknown as FieldErrors<FieldValues>;


describe('IsThisChildAFatty', () => {
  describe('weight', () => {
    it('renders the label to enter values for your fat child', async () => {
      render(<IsThisChildAFatty unitRegistered={unitRegisteredMock} registered={registeredMock} errors={errorsMock}/>);

      const weight = await screen.findByTestId(
        'how-fat-is-the-child-input-label'
      );

      expect(weight).toBeInTheDocument();
    });

    it('renders the input box', async () => {
      render(<IsThisChildAFatty unitRegistered={unitRegisteredMock} registered={registeredMock} errors={errorsMock}/>);

      const weightInput = await screen.findByTestId(
        'how-fat-is-the-child-input'
      );

      expect(weightInput).toBeInTheDocument();
    });
  });

  describe('unit', () => {
    it('renders the label to enter values for your fat child', async () => {
      render(<IsThisChildAFatty unitRegistered={unitRegisteredMock} registered={registeredMock} errors={errorsMock}/>);

      const weight = await screen.findByTestId(
        'how-fat-is-the-child-unit-label'
      );

      expect(weight).toBeInTheDocument();
    });

    it('renders the weight units', async () => {
      render(<IsThisChildAFatty unitRegistered={unitRegisteredMock} registered={registeredMock} errors={errorsMock}/>);

      const weightInput = await screen.findByTestId(
        'how-fat-is-the-child-unit'
      );

      expect(weightInput).toBeInTheDocument();
    });
  });
});
