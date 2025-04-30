import { useForm } from 'react-hook-form';
import { pageOne, errorForThreeCharacters } from '../../lang';
import DatePicker from 'react-datepicker';
import { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/Pages/PageOne.css';

import { shouldShowErrorBasedOnLength } from '../../helpers/formValidation';

import '../../index.css';
import ChildName from './components/ChildName';

const NAME_MIN_LENGTH = 3;

const PageOne = () => {
  const { register, watch } = useForm({
    mode: 'onChange' // validate on every change
  });
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const inputValue = watch('name', '');

  return (
    <>
      <h1>{pageOne.title}</h1>
      <form className="form" data-testid="page-one-form">
        <ChildName
          registered={register('name', { required: true, minLength: 3 })}
          errorCondition={shouldShowErrorBasedOnLength(
            inputValue,
            NAME_MIN_LENGTH
          )}
        />
        <label htmlFor="dob" data-testid="date-of-birth-label">
          {pageOne.childsDob}
          <DatePicker
            selected={startDate}
            placeholderText={startDate?.toDateString()}
            onChange={(date) => setStartDate(date)}
            dateFormat="MMMM do YYYY"
            id="dob"
            showIcon={true}
            data-testid="date-of-birth-input"
          />
        </label>
      </form>
    </>
  );
};

export default PageOne;
