import { render, screen } from '@testing-library/react';
import TextArea from '../../../../src/components/Pages/PageThree/TextArea';
import { UseFormRegisterReturn } from 'react-hook-form';
import { vitest } from 'vitest';

const registeredMock =
  vitest.fn() as unknown as UseFormRegisterReturn<'otherInfo'>;

describe('TextArea', () => {
  it('renders the text area', () => {
    render(<TextArea registered={registeredMock} />);

    const textArea = screen.getByTestId('other-info');

    expect(textArea).toBeVisible();
  });
});
