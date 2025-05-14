import { pageOne } from '../../../lib/lang';
import '../../../styles/Pages/PageOne/AgeCheck.css';

const AgeCheck = () => {
  return (
    <div className="age-check-wrapper" data-testid="age-check-wrapper">
      <label htmlFor="age-check" data-testid="age-check-label">
        {pageOne.ageCheck}
      </label>

      <label htmlFor="age-check-no" className="age-check-label">
        <input
          type="radio"
          data-testid="age-check-no"
          name="ageCheck"
          className="age-check-input"
          defaultChecked
        />
        <span>No</span>
      </label>
      <label htmlFor="age-check-yes" className="age-check-label">
        <input
          type="radio"
          data-testid="age-check-yes"
          className="age-check-input"
          name="ageCheck"
        />
        Yes
      </label>
    </div>
  );
};

export default AgeCheck;
