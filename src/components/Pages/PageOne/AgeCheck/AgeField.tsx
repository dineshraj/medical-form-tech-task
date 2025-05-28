import { pageOne } from '../../../../lib/lang';
import {
  FieldErrors,
  FieldValues,
  UseFormRegisterReturn
} from 'react-hook-form';

interface AgeFieldProps {
  registered: UseFormRegisterReturn<'ageField'>;
  errors: FieldErrors<FieldValues>;
}

const AgeField = ({ registered, errors }: AgeFieldProps) => {
  const errorMessage = errors['ageField']?.message as string;
  
  return (
    <label htmlFor="ageField" data-testid="child-age-field-label">
      <div className="title">{pageOne.under37Weeks}</div>
      <input
        {...registered}
        name="ageField"
        className={errorMessage ? 'error-border' : ''}
        id="ageField"
        data-testid="age-field-select"
      />
      {errorMessage && <p className="error-text">{errorMessage}</p>}
    </label>
  );
};

export default AgeField;
