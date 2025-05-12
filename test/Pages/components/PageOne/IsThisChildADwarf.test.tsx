import { render, screen } from '@testing-library/react';
import IsThisChildADwarf from '../../../../src/components/Pages/PageOne/IsThisChildADwarf';
import { UseFormRegisterReturn, FieldErrors, FieldValues } from 'react-hook-form';
import { vitest } from 'vitest';



const registeredMock = vitest.fn() as unknown as UseFormRegisterReturn<'height'>;
const errorsMock = vitest.fn() as unknown as FieldErrors<FieldValues>;


describe('IsThisChildADwarf', () => {
  describe('height', () => {
    it('renders the label to enter values for your stumpy child', async () => {
      render(<IsThisChildADwarf registered={registeredMock} errors={errorsMock}/>);

      const height = await screen.findByTestId(
        'how-stumpy-is-the-child-input-label'
      );

      expect(height).toBeInTheDocument();
    });

    it('renders the input box', async () => {
      render(<IsThisChildADwarf registered={registeredMock} errors={errorsMock}/>);

      const heightInput = await screen.findByTestId(
        'how-stumpy-is-the-child-input'
      );

      expect(heightInput).toBeInTheDocument();
    });

    describe('unit', () => {
      it('renders the label to enter values for your stumpy child', async () => {
        render(<IsThisChildADwarf registered={registeredMock} errors={errorsMock}/>);

        const height = await screen.findByTestId(
          'how-stumpy-is-the-child-unit-label'
        );

        expect(height).toBeInTheDocument();
      });

      it('renders the options', async () => {
        render(<IsThisChildADwarf registered={registeredMock} errors={errorsMock}/>);

        const heightInput = await screen.findByTestId(
          'how-stumpy-is-the-child-unit'
        );

        expect(heightInput).toBeInTheDocument();
      });
    });
  });
});
