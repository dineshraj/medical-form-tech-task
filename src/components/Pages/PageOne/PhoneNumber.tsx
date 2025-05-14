import PhoneInputWithCountry from 'react-phone-number-input/react-hook-form';

import 'react-phone-number-input/style.css';
import '../../../styles/Pages//PageOne/PhoneNumber.css';
import { pageOne } from '../../../lib/lang';
import { Control, FieldValues } from 'react-hook-form';
import { PageOne } from '../PageOne';

interface PhoneNumberProps {
  onChange: (value: number | undefined) => void;
  value: string | undefined;
  error: FieldValues;
  control: Control<PageOne>
}

const PhoneNumber = ({value, onChange, error, control}: PhoneNumberProps) => {
  console.log("🚀 ~ PhoneNumber ~ error:", error)
  const errorMessage = error?.message || null;

  return (
    <label htmlFor="phoneNumber" data-testid="phone-number-label">
      <div className="title">{pageOne.phoneNumber}</div>
      <PhoneInputWithCountry
        name="phoneInputWithCountrySelect"
        placeholder="Enter phone number"
        international
        control={control}
        defaultCountry="GB"
        value={value}
        onChange={onChange}
      />
      {errorMessage && <p className="error-text">{errorMessage}</p>}
    </label>
  );
};

export default PhoneNumber;
