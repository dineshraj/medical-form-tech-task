import { useForm } from 'react-hook-form';
import { pageOne, errorForThreeCharacters } from '../../lang';

import { shouldShowErrorBasedOnLength } from '../../helpers/formValidation';

import '../../index.css';

const NAME_MIN_LENGTH = 3;


const PageOne = () => {
  const {
    register,
    watch,
  } = useForm({
    mode: 'onChange' // validate on every change
  });

  const inputValue = watch('name', '');

  return (
    <>
      <h1>{pageOne.title}</h1>
      <form className="form" data-testid="page-one-form">
        <label htmlFor="name" data-testid="child-name-label">
          {pageOne.childsName}
        <input
          {...register('name', { required: true, minLength: 3 })}
          className={shouldShowErrorBasedOnLength(inputValue, NAME_MIN_LENGTH) ? 'error-border' : ''}
          placeholder="Alice"
          id="name"
          data-testid="child-name-input"
          />
        {shouldShowErrorBasedOnLength(inputValue, NAME_MIN_LENGTH) && (
          <p className="child-name-error-text">
            {errorForThreeCharacters}
          </p>
        )}
        </label>
      </form>
    </>
  );
};

export default PageOne;
