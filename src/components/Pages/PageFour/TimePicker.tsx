import TimePicker from 'react-datepicker';
import { pageFour, timePlaceholderText } from '../../../lib/lang';
import { FieldValues } from 'react-hook-form';
import ErrorMessage from '../../ErrorMessage';

import '../../../styles/Pages/PageFour/TimePicker.css';

interface TimePickerProps {
  onChange: (date: Date | null) => void;
  value: Date | null;
  error?: FieldValues;
}

const TimePickerWrapper = ({ value, onChange, error }: TimePickerProps) => {
  const errorMessage = error ? error.message : null;

  return (
    <label htmlFor="time-picker" data-testid="appointment-time-label">
      <div className="title">{pageFour.time}</div>
      <TimePicker
        wrapperClassName="time-picker"
        className={errorMessage ? 'error-border' : ''}
        onChange={onChange}
        placeholderText={timePlaceholderText}
        selected={value}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        id="time-picker"
        dateFormat="h:mm aa"
        showIcon={true}
      />
      {errorMessage && <ErrorMessage error={errorMessage} />}
    </label>
  );
};

export default TimePickerWrapper;
