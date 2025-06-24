import DatePicker from 'react-datepicker';
import { datePlaceholderText, pageFour } from '../../../lib/lang';
import { FieldValues } from 'react-hook-form';

import ErrorMessage from '../../ErrorMessage';

import '../../../styles/Pages/PageOne/DateOfBirth.css';
interface DateOfBirthProps {
  onChange: (date: Date | null) => void;
  value: Date | null;
  error?: FieldValues;
}

const AppointmentDate = ({ value, onChange, error }: DateOfBirthProps) => {
  // TODO why doesn't this error work?
  const errorMessage = error ? error.message : null;

  return (
    <label htmlFor="appointmentDate" data-testid="appointment-label">
      <div className="title">{pageFour.appointment}</div>
      <DatePicker
        wrapperClassName="date-picker"
        className={errorMessage ? 'error-border' : ''}
        selected={value}
        placeholderText={datePlaceholderText}
        onChange={onChange}
        dateFormat="MMMM do YYYY"
        id="appointmentDate"
        showIcon={true}
      />
      {errorMessage && <ErrorMessage error={errorMessage} />}
    </label>
  );
};

export default AppointmentDate;
