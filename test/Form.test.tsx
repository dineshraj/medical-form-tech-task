import React from 'react';
import { render, screen } from '@testing-library/react';
import Form from '../src/components/Form';

describe('Form', () => {
  it('renders the form container', async() => {
    render(<Form />);
    const formContainer = await screen.findByTestId('form-container')

    expect(formContainer).toBeVisible();
  })
})