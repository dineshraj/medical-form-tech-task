import userEvent from '@testing-library/user-event';
import { render, screen, within } from '@testing-library/react';
import PageOne from '../../../src/components/Pages/PageOne';
import {
  errorForThreeCharacters,
  errorForNumbers,
  pageOne,
  errorForEmail,
  errorForName,
  errorForPhone,
  errorForDate
} from '../../../src/lib/lang';

describe('PageOne', () => {
  describe('Back button', () => {
    it('renders the next button wrapper but not the button', async () => {
      render(<PageOne />);

      const backButtonWrapper = await screen.findByTestId(
        'back-button-wrapper'
      );
      const backButton = screen.queryByTestId('back-button');

      expect(backButtonWrapper).toBeInTheDocument();
      expect(backButton).not.toBeInTheDocument();
    });
  });

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

  describe('Child name', () => {
    it('renders the child name', async () => {
      render(<PageOne />);

      const nameInput = (await screen.findByTestId(
        'child-name-input'
      )) as HTMLInputElement;

      expect(nameInput).toBeInTheDocument();
    });

    it('shows error message when a number is entered', async () => {
      const user = userEvent.setup();

      render(<PageOne />);

      const nameInput = (await screen.findByTestId(
        'child-name-input'
      )) as HTMLInputElement;

      await user.type(nameInput, '3po');
      const childsNameLabel = await screen.findByTestId('child-name-label');

      expect(nameInput.value).toBe('3po');
      expect(childsNameLabel).toHaveTextContent(errorForName);
    });

    it('shows error message when not enough characters are entered', async () => {
      const user = userEvent.setup();

      render(<PageOne />);

      const nameInput = (await screen.findByTestId(
        'child-name-input'
      )) as HTMLInputElement;

      await user.type(nameInput, 'po');
      const childsNameLabel = await screen.findByTestId('child-name-label');

      expect(nameInput.value).toBe('po');
      expect(childsNameLabel).toHaveTextContent(errorForThreeCharacters);
    });

    it('adds a border when the input criteria is not met for the name', async () => {
      const user = userEvent.setup();

      render(<PageOne />);

      const nameInput = (await screen.findByTestId(
        'child-name-input'
      )) as HTMLInputElement;

      await user.type(nameInput, 'po');

      expect(nameInput.value).toBe('po');
      expect(nameInput).toHaveClass('error-border');
    });
  });

  describe('Child date of birth', () => {
    it('renders the date label', async () => {
      render(<PageOne />);
      const dobLabel = await screen.findByTestId('date-of-birth-label');

      expect(dobLabel).toBeInTheDocument();
      expect(dobLabel.textContent).toBe(pageOne.childsDob);
    });

    it('renders the date picker library', async () => {
      render(<PageOne />);
      const datePickerLabel = await screen.findByTestId('date-of-birth-label');

      const datePicker = within(datePickerLabel).queryByPlaceholderText(
        'Click to select a date'
      );

      expect(datePicker).toBeInTheDocument();
    });

    it.skip('shows error message when a future is entered', async () => {
      const user = userEvent.setup();

      render(<PageOne />);

      const dateLabel = await screen.findByTestId('date-of-birth-label');
      const dateInput = within(dateLabel).getByPlaceholderText(
        'Click to select a date'
      ) as HTMLInputElement;

      // const today = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      dateInput.value = tomorrow.toString();

      await user.type(dateInput, tomorrow.toString());

      expect(dateLabel).toHaveTextContent(errorForDate);
    });

  });

  describe('Age check', () => {
    it('renders the age check label', async () => {
      render(<PageOne />);
      const ageCheckLabel = await screen.findByTestId('age-check-label');

      expect(ageCheckLabel).toBeInTheDocument();
      expect(ageCheckLabel.textContent).toBe(pageOne.ageCheck);
    });

    it('renders the right radio buttons', async () => {
      render(<PageOne />);
      const noRadio = await screen.findByTestId('age-check-no');
      const yesRadio = await screen.findByTestId('age-check-yes');

      expect(noRadio).toBeInTheDocument();
      expect(yesRadio).toBeInTheDocument();
    });
  });

  describe('Weight check', () => {
    it('renders the weight label', async () => {
      render(<PageOne />);
      const weightLabel = await screen.findByTestId(
        'how-fat-is-the-child-input-label'
      );

      expect(weightLabel).toBeInTheDocument();
      expect(weightLabel.textContent).toBe(pageOne.weight);
    });

    it('renders the weight input', async () => {
      render(<PageOne />);
      const weightInput = await screen.findByTestId(
        'how-fat-is-the-child-input'
      );

      expect(weightInput).toBeInTheDocument();
    });

    it('renders the weight unit label', async () => {
      render(<PageOne />);
      const weightLabel = await screen.findByTestId(
        'how-fat-is-the-child-unit-label'
      );

      expect(weightLabel).toBeInTheDocument();
      expect(weightLabel.textContent).toContain(pageOne.weightUnit);
    });

    it('renders the weight unit select', async () => {
      render(<PageOne />);
      const weightUnit = await screen.findByTestId('how-fat-is-the-child-unit');

      expect(weightUnit).toBeInTheDocument();
      expect(weightUnit.textContent).toBe('kglb');
    });

    it('does not show an error message with nothing is entered', async () => {
      render(<PageOne />);

      const childsFatWrapper = await screen.findByTestId(
        'how-fat-is-the-child-wrapper'
      );

      expect(childsFatWrapper).not.toHaveTextContent(errorForNumbers);
    });

    it('shows error message when non-numbers are entered', async () => {
      const user = userEvent.setup();

      render(<PageOne />);

      const weightInput = (await screen.findByTestId(
        'how-fat-is-the-child-input'
      )) as HTMLInputElement;

      await user.type(weightInput, 'poo');

      const childsWeightWrapper = await screen.findByTestId(
        'how-fat-is-the-child-wrapper'
      );

      expect(weightInput.value).toBe('poo');
      expect(childsWeightWrapper).toHaveTextContent(errorForNumbers);
    });

    it('adds a border when the input criteria is not met for the weight', async () => {
      const user = userEvent.setup();

      render(<PageOne />);

      const weightInput = (await screen.findByTestId(
        'how-fat-is-the-child-input'
      )) as HTMLInputElement;

      await user.type(weightInput, 'poo');

      expect(weightInput.value).toBe('poo');
      expect(weightInput).toHaveClass('error-border');
    });
  });

  describe('Height check', () => {
    it('renders the height label', async () => {
      render(<PageOne />);
      const heightLabel = await screen.findByTestId(
        'how-stumpy-is-the-child-input-label'
      );

      expect(heightLabel).toBeInTheDocument();
      expect(heightLabel.textContent).toBe(pageOne.height);
    });

    it('renders the height input', async () => {
      render(<PageOne />);
      const heightInput = await screen.findByTestId(
        'how-stumpy-is-the-child-input'
      );

      expect(heightInput).toBeInTheDocument();
    });

    it('renders the height unit label', async () => {
      render(<PageOne />);
      const heightLabel = await screen.findByTestId(
        'how-stumpy-is-the-child-unit-label'
      );

      expect(heightLabel).toBeInTheDocument();
      expect(heightLabel.textContent).toContain(pageOne.heightUnit);
    });

    it('renders the height unit select', async () => {
      render(<PageOne />);
      const heightUnit = await screen.findByTestId(
        'how-stumpy-is-the-child-unit'
      );

      expect(heightUnit).toBeInTheDocument();
      expect(heightUnit.textContent).toBe('cminches');
    });

    it('does not show an error message with nothing is entered', async () => {
      render(<PageOne />);

      const childsHeightWrapper = await screen.findByTestId(
        'how-stumpy-is-the-child-wrapper'
      );

      expect(childsHeightWrapper).not.toHaveTextContent(errorForNumbers);
    });

    it('shows error message when non-numbers are entered', async () => {
      const user = userEvent.setup();

      render(<PageOne />);

      const heightInput = (await screen.findByTestId(
        'how-stumpy-is-the-child-input'
      )) as HTMLInputElement;

      await user.type(heightInput, 'poo');

      const childsHeightWrapper = await screen.findByTestId(
        'how-stumpy-is-the-child-wrapper'
      );

      expect(heightInput.value).toBe('poo');
      expect(childsHeightWrapper).toHaveTextContent(errorForNumbers);
    });

    it('adds a border when the input criteria is not met for the height', async () => {
      const user = userEvent.setup();

      render(<PageOne />);

      const heightInput = (await screen.findByTestId(
        'how-stumpy-is-the-child-input'
      )) as HTMLInputElement;

      await user.type(heightInput, 'poo');

      expect(heightInput.value).toBe('poo');
      expect(heightInput).toHaveClass('error-border');
    });
  });

  describe('Email', () => {
    it('renders the Email name', async () => {
      render(<PageOne />);
      const emailLabel = await screen.findByTestId('enter-your-email');

      expect(emailLabel).toBeInTheDocument();
      expect(emailLabel.textContent).toContain(pageOne.email);
    });

    it('does not show an error message with nothing is entered', async () => {
      render(<PageOne />);

      const emailLabel = await screen.findByTestId('enter-your-email');

      expect(emailLabel).not.toHaveTextContent(errorForEmail);
    });

    it('does not show an error message when a valid email is entered', async () => {
      const user = userEvent.setup();

      render(<PageOne />);

      const emailInput = (await screen.findByTestId(
        'enter-your-email-input'
      )) as HTMLInputElement;

      await user.type(emailInput, 'poo@toilet.room');

      const emailLabel = await screen.findByTestId('enter-your-email');

      expect(emailInput.value).toBe('poo@toilet.room');
      expect(emailLabel).not.toHaveTextContent(errorForEmail);
    });

    it('shows error message when an invalid email is entered', async () => {
      const user = userEvent.setup();

      render(<PageOne />);

      const emailInput = (await screen.findByTestId(
        'enter-your-email-input'
      )) as HTMLInputElement;

      await user.type(emailInput, 'poo');

      const emailLabel = await screen.findByTestId('enter-your-email');

      expect(emailInput.value).toBe('poo');
      expect(emailLabel).toHaveTextContent(errorForEmail);
    });

    it('adds a border when the input criteria is not met for the email', async () => {
      const user = userEvent.setup();

      render(<PageOne />);

      const emailInput = (await screen.findByTestId(
        'enter-your-email-input'
      )) as HTMLInputElement;

      await user.type(emailInput, 'poo');

      expect(emailInput.value).toBe('poo');
      expect(emailInput).toHaveClass('error-border');
    });
  });

  describe('Phone Number', () => {
    it('renders the phone number label', async () => {
      render(<PageOne />);

      const phoneNumberLabel = await screen.findByTestId('phone-number-label');

      expect(phoneNumberLabel.textContent).toContain(pageOne.phoneNumber);
    });

    it('renders the phone npm package', async () => {
      render(<PageOne />);

      const phoneNumberLabel = await screen.findByTestId('phone-number-label');
      // lots of options so get them all and select the first one
      const options = within(phoneNumberLabel).getAllByRole('option');

      expect(options[0]).toBeInTheDocument();
    });

    it('does not show an error message with nothing is entered', async () => {
      render(<PageOne />);

      const phoneNumberLabel = await screen.findByTestId('phone-number-label');

      expect(phoneNumberLabel).not.toHaveTextContent(errorForPhone);
    });

    it('shows error message when a non-valid phone number is entered', async () => {
      const user = userEvent.setup();

      render(<PageOne />);

      const phoneNumberLabel = await screen.findByTestId('phone-number-label');
      const phoneNumberInput = within(phoneNumberLabel).getByPlaceholderText(
        'Enter phone number'
      ) as HTMLInputElement;

      await user.type(phoneNumberInput, '1');

      expect(phoneNumberInput.value).toBe('+44 1');
      expect(phoneNumberLabel).toHaveTextContent(errorForPhone);
    });
  });

  describe('Next button', () => {
    it('renders the next button as disabled by default', async () => {
      render(<PageOne />);

      const nextButton = await screen.findByTestId('next-button-page-1');

      expect(nextButton).toBeInTheDocument();
      expect(nextButton).toBeDisabled();
    });

    it('renders the next button as active when the correct values are entered for all required fields', async () => {
      const user = userEvent.setup();
      render(<PageOne />);

      // child name
      const nameInput = (await screen.findByTestId(
        'child-name-input'
      )) as HTMLInputElement;

      await user.type(nameInput, 'anakin');

      // dob
      const datePickerLabel = await screen.findByTestId('date-of-birth-label');
      const datePicker = within(datePickerLabel).queryByPlaceholderText(
        'Click to select a date'
      );
      datePicker?.setAttribute('value', 'May 4th 2025');

      // email
      const emailInput = (await screen.findByTestId(
        'enter-your-email-input'
      )) as HTMLInputElement;

      await user.type(emailInput, 'poo@toilet.room');

      // phone
      const phoneNumberLabel = await screen.findByTestId('phone-number-label');
      const phoneNumberInput =
        within(phoneNumberLabel).getByPlaceholderText('Enter phone number');

      await user.type(phoneNumberInput, '79054356793');

      //next button
      const nextButton = await screen.findByTestId('next-button-page-1');

      expect(nextButton).toBeInTheDocument();
      expect(nextButton).not.toBeDisabled();
    });
  });
});
