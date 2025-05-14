import DatePicker from 'react-datepicker';
import { pageOne } from '../../../lib/lang';
import '../../../styles/Pages/PageOne/DateOfBirth.css';
import { FieldValues } from 'react-hook-form';

interface DateOfBirthProps {
  onChange: (date: Date | null) => void;
  value: Date | null;
  error?: FieldValues;
}

const DateOfBirth = ({ value, onChange, error }: DateOfBirthProps) => {
  const errorMessage = error?.message || null;

  return (
    <label htmlFor="dob" data-testid="date-of-birth-label">
      <div className="title">{pageOne.childsDob}</div>
      <DatePicker
        wrapperClassName="date-picker"
        className={errorMessage ? 'error-border' : ''}
        selected={value}
        placeholderText="Click to select a date"
        onChange={onChange}
        dateFormat="MMMM do YYYY"
        id="dob"
        showIcon={true}
      />
      {errorMessage && <p className="error-text">{errorMessage}</p>}
    </label>
  );
};

export default DateOfBirth;
