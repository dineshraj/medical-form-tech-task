import DatePicker from 'react-datepicker';
import { datePlaceholderText, pageOne } from '../../../lib/lang';
import { FieldValues } from 'react-hook-form';
import ErrorMessage from '../ErrorMessage';

import '../../../styles/Pages/PageOne/DateOfBirth.css';
interface DateOfBirthProps {
  onChange: (date: Date | null) => void;
  value: Date | null;
  error?: FieldValues;
}

const DateOfBirth = ({ value, onChange, error }: DateOfBirthProps) => {
  const errorMessage = error ? error.message : null;

  return (
    <label htmlFor="dob" data-testid="date-of-birth-label">
      <div className="title">{pageOne.childsDob}</div>
      <DatePicker
        wrapperClassName="date-picker"
        className={errorMessage ? 'error-border' : ''}
        selected={value}
        placeholderText={datePlaceholderText}
        onChange={onChange}
        dateFormat="MMMM do YYYY"
        id="dob"
        showIcon={true}
      />
      {errorMessage && <ErrorMessage error={errorMessage} />}
    </label>
  );
};

export default DateOfBirth;
