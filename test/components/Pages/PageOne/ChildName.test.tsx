import { render, screen } from '@testing-library/react';
import ChildName from '../../../../src/components/Pages/PageOne/ChildName';
import { pageOne } from '../../../../src/lib/lang';
import { vitest } from 'vitest';
import { FieldErrors, FieldValues, UseFormRegisterReturn } from 'react-hook-form';

const registeredMock = vitest.fn() as unknown as UseFormRegisterReturn<'name'>;
const errorsMock = vitest.fn() as unknown as FieldErrors<FieldValues>;

describe('Child first name', () => {
  it('renders the first input and label', async () => {
    render(<ChildName registered={registeredMock} errors={errorsMock} />);
    const nameLabel = await screen.findByTestId('child-name-label');
    const nameInput = await screen.findByTestId('child-name-input');

    expect(nameLabel).toBeInTheDocument();
    expect(nameLabel.textContent).toBe(pageOne.childsName);
    expect(nameInput).toBeInTheDocument();
  });
});
