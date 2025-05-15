import {
  FieldErrors,
  FieldValues,
  UseFormRegisterReturn
} from 'react-hook-form';
import { pageOne } from '../../../lib/lang';
import '../../../styles/Pages/PageOne/IsThisChildADwarf.css';

interface IsThisChildADwarfNameProps {
  registered: UseFormRegisterReturn<'height'>;
  unitRegistered: UseFormRegisterReturn<'heightUnit'>;
  errors: FieldErrors<FieldValues>;
}

const { height, heightUnit } = pageOne;

const IsThisChildADwarf = ({
  registered,
  unitRegistered,
  errors
}: IsThisChildADwarfNameProps) => {

  const error = errors.height?.message as string;

  return (
    <div
      className="dwarf-value-wrapper"
      data-testid="how-stumpy-is-the-child-wrapper"
    >
      <div className="dwarf-value">
        <label
          htmlFor="height"
          data-testid="how-stumpy-is-the-child-input-label"
        >
          <div className="title">{height}</div>
          <input
            {...registered}
            className={error ? 'error-border' : ''}
            data-testid="how-stumpy-is-the-child-input"
          />
        </label>
        <label htmlFor="unit" data-testid="how-stumpy-is-the-child-unit-label">
          <div className="title">{heightUnit}</div>
          <select
            {...unitRegistered}
            data-testid="how-stumpy-is-the-child-unit"
            id="unit"
            name="heightUnit"
            defaultValue="cm"
          >
            <option value="cm">cm</option>
            <option value="inches">inches</option>
          </select>
        </label>
      </div>
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default IsThisChildADwarf;
