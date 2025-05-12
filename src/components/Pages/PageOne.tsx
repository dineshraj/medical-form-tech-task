import { useState } from 'react';
import { useForm } from 'react-hook-form';

import ChildName from './PageOne/ChildName';
import DateOfBirth from './PageOne/DateOfBirth';
import AgeCheck from './PageOne/AgeCheck';
import IsThisChildAFatty from './PageOne/IsThisChildAFatty';
import IsThisChildADwarf from './PageOne/IsThisChildADwarf';
import Email from './PageOne/Email';
import PhoneNumber from './PageOne/PhoneNumber';
import NextButton from './NextButton';
import BackButton from './BackButton';
import {
  errorForEmail,
  errorForNumbers,
  errorForThreeCharacters,
  pageOne
} from '../../lib/lang';

import 'react-datepicker/dist/react-datepicker.css';
import { NAME_MIN_LENGTH } from '../../constants';

const PageOne = () => {
  const [selectedDate, setSelectedtDate] = useState<Date | null>(null);

  const {
    register,
    // watch,
    formState: { errors }
  } = useForm({ mode: 'onChange' });

  // watch('name');
  // watch('weight');
  // watch('height');

  return (
    <>
      <h1>{pageOne.title}</h1>
      <form className="form" data-testid="page-one-form">
        <BackButton page={1} />
        <ChildName
          registered={register('name', {
            required: true,
            minLength: {
              value: NAME_MIN_LENGTH,
              message: errorForThreeCharacters
            }
          })}
          errors={errors}
        />
        <DateOfBirth
          updatedDate={selectedDate}
          handleOnChange={(date) => setSelectedtDate(date)}
        />
        <AgeCheck />
        <IsThisChildAFatty
          registered={register('weight', {
            required: true,
            valueAsNumber: true,
            validate: (value) => /^\d+$/.test(value) || errorForNumbers
          })}
          errors={errors}
        />
        <IsThisChildADwarf
          registered={register('height', {
            required: true,
            valueAsNumber: true,
            validate: (value) => /^\d+$/.test(value) || errorForNumbers
          })}
          errors={errors}
        />
        <Email
          registered={register('email', {
            required: true,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: errorForEmail
            }
          })}
          errors={errors}
        />
        <PhoneNumber />
        <NextButton />
      </form>
    </>
  );
};

export default PageOne;
