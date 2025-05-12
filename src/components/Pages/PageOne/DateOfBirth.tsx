import DatePicker from 'react-datepicker';
import { pageOne } from '../../../lib/lang';
import '../../../styles/Pages/PageOne/DateOfBirth.css';

interface DateOfBirthProps {
  handleOnChange: (date: Date | null) => void;
  updatedDate: Date | null;
}

const DateOfBirth = ({ handleOnChange, updatedDate }: DateOfBirthProps) => {
  return (
    <label htmlFor="dob" data-testid="date-of-birth-label">
      <div className="title">{pageOne.childsDob}</div>
      <DatePicker
        selected={updatedDate || undefined}
        placeholderText="Click to select a date"
        onChange={(date) => handleOnChange(date)}
        dateFormat="MMMM do YYYY"
        id="dob"
        showIcon={true}
      />
    </label>
  );
};

export default DateOfBirth;
