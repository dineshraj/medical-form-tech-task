import {
  FieldErrors,
  FieldValues,
  UseFormRegisterReturn
} from 'react-hook-form';
import { pageOne } from '../../../lib/lang';
import '../../../styles/Pages/PageOne/AgeCheck.css';

interface AgeCheckProps {
  registered: UseFormRegisterReturn<'ageCheck'>;
  errors: FieldErrors<FieldValues>;
}

const AgeCheck = ({ registered, errors }: AgeCheckProps) => {
  const errorMessage = errors.ageCheck?.message as string;

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
          value="false"
          className="age-check-input"
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
          value="true"
        />
        Yes
      </label>
      {errorMessage && <p className="error-text">{errorMessage}</p>}
    </div>
  );
};

export default AgeCheck;
