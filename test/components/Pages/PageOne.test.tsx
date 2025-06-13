import { render, screen, waitFor, within } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { MemoryRouter } from 'react-router-dom';
import { ReactElement, ReactNode } from 'react';
import { vi } from 'vitest';
import { zodResolver } from '@hookform/resolvers/zod';
import userEvent, { UserEvent } from '@testing-library/user-event';
import PageOne from '../../../src/components/Pages/PageOne';
import {
  errorForThreeCharacters,
  errorForNumbers,
  pageOne,
  errorForEmail,
  errorForName,
  errorForPhone,
  errorForDate,
  datePlaceholderText
} from '../../../src/lib/lang';
import { PageOneSchema } from '../../../src/lib/schema';
import { FORM_KEY } from '../../../src/App';

const mockNavigate = vi.fn();

vi.mock('react-router', async () => {
  const original = await vi.importActual('react-router');
  return {
    ...original,
    useNavigate: () => mockNavigate
  };
});

const fillInFormCorrectly = async (
  user: UserEvent,
  {
    height,
    weight,
    ageCheck
  }: { height: boolean; weight: boolean; ageCheck: string } = {
    height: false,
    weight: false,
    ageCheck: 'no'
  }
) => {
  // child name
  const nameInput = (await screen.findByTestId(
    'child-name-input'
  )) as HTMLInputElement;

  await user.type(nameInput, 'anakin');

  // dob
  const datePickerLabel = await screen.findByTestId('date-of-birth-label');
  const datePicker = within(datePickerLabel).queryByPlaceholderText(
    datePlaceholderText
  ) as unknown as HTMLElement;

  await user.click(datePicker);
  //TODO this is brittle if other options are on the page in the future
  await user.click(screen.getAllByRole('option')[0]);

  // age check
  const ageCheckRadioButton = screen.getByTestId(`age-check-${ageCheck}`);
  await user.click(ageCheckRadioButton);

  // age input if less than 37 weeks
  if (ageCheck === 'yes') {
    const ageField = screen.getByTestId('age-field');
    await user.type(ageField, '33');
  }

  // height
  if (height) {
    const heightInput = screen.getByTestId('how-stumpy-is-the-child-input');
    await user.type(heightInput, '90');
  }

  // weight
  if (weight) {
    const weightInput = screen.getByTestId('how-fat-is-the-child-input');
    await user.type(weightInput, '34');
  }

  if (ageCheck === 'yes') {
    // const weightInput = screen.getByTestId('child-age-field-label');
    // await user.type(weightInput, '12');
  }

  // email
  const emailInput = (await screen.findByTestId(
    'enter-your-email-input'
  )) as HTMLInputElement;

  await user.type(emailInput, 'poo@toilet.room');

  // phone
  const phoneNumberLabel = await screen.findByTestId('phone-number-label');
  const phoneNumberInput =
    within(phoneNumberLabel).getByPlaceholderText('Enter phone number');

  await user.type(phoneNumberInput, '7906322752');
};

const renderWithReactHookForm = (ui: ReactElement) => {
  const Wrapper = ({ children }: { children: ReactNode }) => {
    const methods = useForm({
      mode: 'onChange',
      resolver: zodResolver(PageOneSchema)
    });

    return (
      <MemoryRouter>
        <FormProvider {...methods}>{children}</FormProvider>
      </MemoryRouter>
    );
  };

  return {
    ...render(ui, { wrapper: Wrapper })
  };
};

const renderApp = () => {
  renderWithReactHookForm(<PageOne />);
};

describe('PageOne', () => {
  afterAll(() => {
    vi.restoreAllMocks();
  });

  describe('Progress bar', () => {
    it('renders the progress bar with the first bar highlighted', async () => {
      renderApp();

      const progressBar = await screen.findByTestId('progress-bar');
      const progressBarItems =
        within(progressBar).queryAllByTestId('progress-bar__item');

      expect(progressBarItems[0]).toHaveAttribute(
        'style',
        'background-color: rgb(118, 87, 191);'
      );
      expect(progressBarItems[1]).toHaveAttribute(
        'style',
        'background-color: rgb(242, 242, 242);'
      );
      expect(progressBarItems[2]).toHaveAttribute(
        'style',
        'background-color: rgb(242, 242, 242);'
      );
      expect(progressBarItems[3]).toHaveAttribute(
        'style',
        'background-color: rgb(242, 242, 242);'
      );
    });
  });

  describe('Back button', () => {
    it('renders the next button wrapper but not the button', async () => {
      renderApp();

      const backButtonWrapper = await screen.findByTestId(
        'back-button-wrapper'
      );
      const backButton = screen.queryByTestId('back-button');

      expect(backButtonWrapper).toBeInTheDocument();
      expect(backButton).not.toBeInTheDocument();
    });
  });

  it('renders the title', async () => {
    renderApp();
    const title = await screen.findByRole('heading', { level: 1 });

    expect(title.textContent).toBe(pageOne.title);
  });

  it('renders a form', async () => {
    renderApp();
    const form = await screen.findByTestId('page-one-form');

    expect(form).toBeInTheDocument();
  });

  describe('Child name', () => {
    it('renders the child name', async () => {
      renderApp();

      const nameInput = (await screen.findByTestId(
        'child-name-input'
      )) as HTMLInputElement;

      expect(nameInput).toBeInTheDocument();
    });

    it('shows error message when a number is entered', async () => {
      const user = userEvent.setup();

      renderApp();

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

      renderApp();

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

      renderApp();

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
      renderApp();
      const dobLabel = await screen.findByTestId('date-of-birth-label');

      expect(dobLabel).toBeInTheDocument();
      expect(dobLabel.textContent).toBe(pageOne.childsDob);
    });

    it('renders the date picker library', async () => {
      renderApp();
      const datePickerLabel = await screen.findByTestId('date-of-birth-label');

      const datePicker =
        within(datePickerLabel).queryByPlaceholderText(datePlaceholderText);

      expect(datePicker).toBeInTheDocument();
    });

    it.skip('shows error message when a future date is entered', async () => {
      const user = userEvent.setup();

      renderApp();

      const dateLabel = await screen.findByTestId('date-of-birth-label');
      const dateInput = within(dateLabel).getByPlaceholderText(
        datePlaceholderText
      ) as HTMLInputElement;

      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      dateInput.value = tomorrow.toString();

      await user.type(dateInput, tomorrow.toString());

      expect(dateLabel).toHaveTextContent(errorForDate);
    });
  });

  describe('Age check', () => {
    it('renders the age check label', async () => {
      renderApp();
      const ageCheckLabel = await screen.findByTestId('age-check-label');

      expect(ageCheckLabel).toBeInTheDocument();
      expect(ageCheckLabel.textContent).toBe(pageOne.ageCheck);
    });

    it('renders the right radio buttons', async () => {
      renderApp();
      const noRadio = await screen.findByTestId('age-check-no');
      const yesRadio = await screen.findByTestId('age-check-yes');

      expect(noRadio).toBeInTheDocument();
      expect(yesRadio).toBeInTheDocument();
    });

    it('renders a new field if the baby is born less than 37 weeks ago', async () => {
      const user = userEvent.setup();

      renderApp();
      const yesRadio = await screen.findByTestId('age-check-yes');
      const weeksOld = screen.queryByTestId('child-age-field-label');
      expect(weeksOld).not.toBeInTheDocument();
      await user.click(yesRadio);
      await waitFor(() => {
        const weeksOld = screen.queryByTestId('child-age-field-label');
        expect(weeksOld).toBeInTheDocument();
      });
    });

    it('does not render a new field if the baby is born less more than 37 weeks ago', async () => {
      const user = userEvent.setup();

      renderApp();
      const noRadio = await screen.findByTestId('age-check-no');
      await user.click(noRadio);
      const weeksOld = screen.queryByTestId('child-age-field-label');
      expect(weeksOld).not.toBeInTheDocument();
    });
  });

  describe('Weight check', () => {
    it('renders the weight label', async () => {
      renderApp();
      const weightLabel = await screen.findByTestId(
        'how-fat-is-the-child-input-label'
      );

      expect(weightLabel).toBeInTheDocument();
      expect(weightLabel.textContent).toBe(pageOne.weight);
    });

    it('renders the weight input', async () => {
      renderApp();
      const weightInput = await screen.findByTestId(
        'how-fat-is-the-child-input'
      );

      expect(weightInput).toBeInTheDocument();
    });

    it('renders the weight unit label', async () => {
      renderApp();
      const weightLabel = await screen.findByTestId(
        'how-fat-is-the-child-unit-label'
      );

      expect(weightLabel).toBeInTheDocument();
      expect(weightLabel.textContent).toContain(pageOne.weightUnit);
    });

    it('renders the weight unit select', async () => {
      renderApp();
      const weightUnit = await screen.findByTestId('how-fat-is-the-child-unit');

      expect(weightUnit).toBeInTheDocument();
      expect(weightUnit.textContent).toBe('kglb');
    });

    it('does not show an error message with nothing is entered', async () => {
      renderApp();

      const childsFatWrapper = await screen.findByTestId(
        'how-fat-is-the-child-wrapper'
      );

      expect(childsFatWrapper).not.toHaveTextContent(errorForNumbers);
    });

    it('shows error message when non-numbers are entered', async () => {
      const user = userEvent.setup();

      renderApp();

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

      renderApp();

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
      renderApp();
      const heightLabel = await screen.findByTestId(
        'how-stumpy-is-the-child-input-label'
      );

      expect(heightLabel).toBeInTheDocument();
      expect(heightLabel.textContent).toBe(pageOne.height);
    });

    it('renders the height input', async () => {
      renderApp();
      const heightInput = await screen.findByTestId(
        'how-stumpy-is-the-child-input'
      );

      expect(heightInput).toBeInTheDocument();
    });

    it('renders the height unit label', async () => {
      renderApp();
      const heightLabel = await screen.findByTestId(
        'how-stumpy-is-the-child-unit-label'
      );

      expect(heightLabel).toBeInTheDocument();
      expect(heightLabel.textContent).toContain(pageOne.heightUnit);
    });

    it('renders the height unit select', async () => {
      renderApp();
      const heightUnit = await screen.findByTestId(
        'how-stumpy-is-the-child-unit'
      );

      expect(heightUnit).toBeInTheDocument();
      expect(heightUnit.textContent).toBe('cminches');
    });

    it('does not show an error message with nothing is entered', async () => {
      renderApp();

      const childsHeightWrapper = await screen.findByTestId(
        'how-stumpy-is-the-child-wrapper'
      );

      expect(childsHeightWrapper).not.toHaveTextContent(errorForNumbers);
    });

    it('shows error message when non-numbers are entered', async () => {
      const user = userEvent.setup();

      renderApp();

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

      renderApp();

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
      renderApp();
      const emailLabel = await screen.findByTestId('enter-your-email');

      expect(emailLabel).toBeInTheDocument();
      expect(emailLabel.textContent).toContain(pageOne.email);
    });

    it('does not show an error message with nothing is entered', async () => {
      renderApp();

      const emailLabel = await screen.findByTestId('enter-your-email');

      expect(emailLabel).not.toHaveTextContent(errorForEmail);
    });

    it('does not show an error message when a valid email is entered', async () => {
      const user = userEvent.setup();

      renderApp();

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

      renderApp();

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

      renderApp();

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
      renderApp();

      const phoneNumberLabel = await screen.findByTestId('phone-number-label');

      expect(phoneNumberLabel.textContent).toContain(pageOne.phoneNumber);
    });

    it('renders the phone npm package', async () => {
      renderApp();

      const phoneNumberLabel = await screen.findByTestId('phone-number-label');
      // lots of options so get them all and select the first one
      const options = within(phoneNumberLabel).getAllByRole('option');

      expect(options[0]).toBeInTheDocument();
    });

    it('does not show an error message with nothing is entered', async () => {
      renderApp();

      const phoneNumberLabel = await screen.findByTestId('phone-number-label');

      expect(phoneNumberLabel).not.toHaveTextContent(errorForPhone);
    });

    it('shows error message when a non-valid phone number is entered', async () => {
      const user = userEvent.setup();

      renderApp();

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
      renderApp();

      const nextButton = await screen.findByTestId('next-button-page-1');

      expect(nextButton).toBeInTheDocument();
      expect(nextButton).toBeDisabled();
    });

    it('renders the next button as active when the correct values are entered for all required fields', async () => {
      const user = userEvent.setup();
      renderApp();
      await fillInFormCorrectly(user);

      const nextButton = await screen.findByTestId('next-button-page-1');

      expect(nextButton).toBeInTheDocument();
      expect(nextButton).not.toBeDisabled();
    });

    it('calls navigate() with the right url', async () => {
      const user = userEvent.setup();

      renderApp();
      await fillInFormCorrectly(user, {
        height: true,
        weight: true,
        ageCheck: 'yes'
      });

      const nextButton = await screen.findByTestId('next-button-page-1');
      expect(nextButton).toBeInTheDocument();

      await user.click(nextButton);

      expect(mockNavigate).toHaveBeenCalledWith('/symptoms');
    });
  });

  describe('Local storage', () => {
    it('Adds data to local storage when the form is submitted but omits empty fields', async () => {
      const user = userEvent.setup();
      renderApp();
      await fillInFormCorrectly(user);

      const nextButton = await screen.findByTestId('next-button-page-1');

      expect(nextButton).toBeInTheDocument();

      await user.click(nextButton);

      //TODO don't hardcode these
      const expectedData = {
        name: 'anakin',
        dob: '2025-05-31T23:00:00.000Z',
        ageCheck: 'no',
        email: 'poo@toilet.room',
        phone: '+447906322752'
      };

      expect(localStorage.setItem).toHaveBeenCalledWith(
        'medicalData',
        JSON.stringify(expectedData)
      );
    });

    it('Adds data to local storage when the form is submitted with all fields', async () => {
      const user = userEvent.setup();
      renderApp();
      await fillInFormCorrectly(user, {
        height: true,
        weight: true,
        ageCheck: 'yes'
      });

      const nextButton = await screen.findByTestId('next-button-page-1');

      expect(nextButton).toBeInTheDocument();

      await user.click(nextButton);

      //TODO don't hardcode these
      const expectedData = {
        name: 'anakin',
        dob: '2025-05-31T23:00:00.000Z',
        ageCheck: 'yes',
        ageField: 33,
        weight: 34,
        weightUnit: 'kg',
        height: 90,
        heightUnit: 'cm',
        email: 'poo@toilet.room',
        phone: '+447906322752'
      };
      expect(localStorage.setItem).toHaveBeenCalledWith(
        FORM_KEY,
        JSON.stringify(expectedData)
      );
    });
  });
});
