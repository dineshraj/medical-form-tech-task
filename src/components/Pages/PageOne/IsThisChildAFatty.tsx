import { pageOne } from '../../../lib/lang';
import '../../../styles/Pages/PageOne/IsThisChildAFatty.css';

import {
  FieldErrors,
  FieldValues,
  UseFormRegisterReturn
} from 'react-hook-form';

interface IsThisChildAFattyNameProps {
  registered: UseFormRegisterReturn<'weight'>;
  unitRegistered: UseFormRegisterReturn<'weightUnit'>;
  errors: FieldErrors<FieldValues>;
}

const IsThisChildAFatty = ({
  registered,
  unitRegistered,
  errors
}: IsThisChildAFattyNameProps) => {
  const error = errors.weight?.message as string;

  return (
    <div className="fatty" data-testid="how-fat-is-the-child-wrapper">
      <div className="fatty-value" data-testid="how-fat-is-the-child">
        <label htmlFor="weight" data-testid="how-fat-is-the-child-input-label">
          <div className="title">{pageOne.weight}</div>
          <input
            {...registered}
            className={error ? 'error-border' : ''}
            data-testid="how-fat-is-the-child-input"
            id="weight"
          />
        </label>
        <label htmlFor="unit" data-testid="how-fat-is-the-child-unit-label">
          <div className="title">{pageOne.weightUnit}</div>
          <select
            {...unitRegistered}
            data-testid="how-fat-is-the-child-unit"
            id="unit"
            defaultValue="kg"
            name="weightUnit"
          >
            <option value="kg">kg</option>
            <option value="lb">lb</option>
          </select>
        </label>
      </div>
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default IsThisChildAFatty;
