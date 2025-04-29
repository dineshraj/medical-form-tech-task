import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PageOne from '../../src/components/Pages/PageOne';
import { pageOne, errorForThreeCharacters } from '../../src/lang';

describe('PageOne', () => {
  it('renders the title', async () => {
    render(<PageOne />);
    const title = await screen.findByRole('heading', { level: 1 });

    expect(title.textContent).toBe(pageOne.title);
  });

  it('renders a form', async () => {
    render(<PageOne />);
    const form = await screen.findByTestId('page-one-form');

    expect(form).toBeInTheDocument();
  });

  describe('Child first name', () => {
    it('renders the first input label', async () => {
      render(<PageOne />);
      const nameLabel = await screen.findByTestId('child-name-label');
      const nameInput = await screen.findByTestId('child-name-input');

      expect(nameLabel).toBeInTheDocument();
      expect(nameLabel.textContent).toBe(pageOne.childsName);
      expect(nameInput).toBeInTheDocument();
    });

    it('shows the name input with an error message underneath once the user starts typing untill the user meets the criteria', async () => {
      const user = userEvent.setup();

      render(<PageOne />);

      const nameInput = (await screen.findByLabelText(
        pageOne.childsName
      )) as HTMLInputElement;

      await user.type(nameInput, 'po');

      const childsNameLabel = await screen.findByTestId('child-name-label');

      expect(nameInput.value).toBe('po');
      expect(childsNameLabel).toHaveTextContent(errorForThreeCharacters);
    });

    it('adds a border when the input criteria is not met', async () => {
      const user = userEvent.setup();

      render(<PageOne />);

      const nameInput = (await screen.findByLabelText(
        pageOne.childsName
      )) as HTMLInputElement;
      await user.type(nameInput, 'po');

      expect(nameInput.value).toBe('po');
      expect(nameInput).toHaveClass('error-border');
    });
  });

  describe('Child date of birth', () => {
    
  });
});
