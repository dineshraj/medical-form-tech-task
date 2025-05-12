import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import '../../../styles/Pages//PageOne/PhoneNumber.css';
import { pageOne } from '../../../lib/lang';

const PhoneNumber = () => {
  return (
    <label htmlFor="phoneNumber" data-testid="phone-number-label">
      <div className="title">{pageOne.phoneNumber}</div>

      <PhoneInput
        placeholder="Enter phone number"
        international
        defaultCountry="GB"
        onChange={() => {}}
      />
    </label>
  );
};

export default PhoneNumber;
