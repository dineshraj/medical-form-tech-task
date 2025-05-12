import { pageOne } from '../../../lib/lang';
import {
  FieldErrors,
  FieldValues,
  UseFormRegisterReturn
} from 'react-hook-form';

interface ChildNameProps {
  registered: UseFormRegisterReturn<'name'>;
  errors: FieldErrors<FieldValues>;
}

const ChildName = ({ registered, errors }: ChildNameProps) => {
  const error = errors.name?.message as string;

  return (
    <label htmlFor="name" data-testid="child-name-label">
      <div className="title">{pageOne.childsName}</div>
      <input
        {...registered}
        className={error ? 'error-border' : ''}
        placeholder="Alice"
        id="name"
        data-testid="child-name-input"
      />
      {error && <p className="error-text">{error}</p>}
    </label>
  );
};

export default ChildName;
