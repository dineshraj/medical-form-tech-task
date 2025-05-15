import { FieldErrors, FieldValues, UseFormRegisterReturn } from 'react-hook-form';
import { pageOne } from '../../../lib/lang';

interface EmailProps {
  registered: UseFormRegisterReturn<'email'>;
  errors: FieldErrors<FieldValues>;
}

const Email = ({ registered, errors}: EmailProps) => {
  const error = errors.email?.message as string;

  return (
    <label
      htmlFor="email"
      className="enter-your-email"
      data-testid="enter-your-email"
    >
      <div className="title">{pageOne.email}</div>
      <input
        {...registered}
        className={error ? 'error-border' : ''}
        id="email"
        type="email"
        placeholder='short@fat.com'
        data-testid="enter-your-email-input"
      />
      {error && <p className="error-text">{error}</p>}
    </label>
  );
};

export default Email;
