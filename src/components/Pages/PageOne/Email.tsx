import { FieldErrors, FieldValues, UseFormRegisterReturn } from 'react-hook-form';
import { pageOne } from '../../../lib/lang';

interface EmailProps {
  registered: UseFormRegisterReturn<'email'>;
  errors: FieldErrors<FieldValues>;
}

const Email = ({ registered, errors}: EmailProps) => {
  // const {
  //   register,
  //   watch,
  //   formState: { errors }
  // } = useForm({
  //   mode: 'onChange'
  // });

  // const registered = register('email', {
  //   required: true,
  //   pattern: {
  //     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  //     message: errorForEmail
  //   }
  // });

  // watch('email');
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
