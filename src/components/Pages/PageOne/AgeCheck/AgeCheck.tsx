import {
  // FieldErrors,
  FieldValues,
  UseFormRegisterReturn
} from 'react-hook-form';
import { pageOne } from '../../../../lib/lang';
import '../../../../styles/Pages/PageOne/AgeCheck.css';
// import { ChangeEventHandler } from 'react';

interface AgeCheckProps {
  registered: UseFormRegisterReturn<'ageCheck'>;
  error?: FieldValues;
}

// interface AgeCheckProps {
//   onChange: ChangeEventHandler<HTMLInputElement>;
//   value: string;
//   error?: FieldValues;
// }

const AgeCheck = ({ registered, error }: AgeCheckProps) => {
  // const AgeCheck = ({ onChange, error }: AgeCheckProps) => {
  const errorMessage = error?.message as string;

  return (
    <div className="age-check-wrapper" data-testid="age-check-wrapper">
      <label htmlFor="age-check" data-testid="age-check-label">
        {pageOne.ageCheck}
      </label>

      <label htmlFor="age-check-no" className="age-check-label">
        <input
          {...registered}
          type="radio"
          data-testid="age-check-no"
          name="ageCheck"
          value="no"
          className="age-check-input"
          // onChange={onChange}
        />
        <span>No</span>
      </label>
      <label htmlFor="age-check-yes" className="age-check-label">
        <input
          {...registered}
          type="radio"
          data-testid="age-check-yes"
          className="age-check-input"
          name="ageCheck"
          value="yes"
          // onChange={onChange}
        />
        Yes
      </label>
      {errorMessage && <p className="error-text">{errorMessage}</p>}
    </div>
  );
};

export default AgeCheck;
