import {
  Controller,
  SubmitHandler,
  useFormContext,
  useFormState
} from 'react-hook-form';
import { useNavigate } from 'react-router';

import ChildName from './PageOne/ChildName';
import DateOfBirth from './PageOne/DateOfBirth';
import AgeCheck from './PageOne/AgeCheck/AgeCheck';
import IsThisChildAFatty from './PageOne/IsThisChildAFatty';
import IsThisChildADwarf from './PageOne/IsThisChildADwarf';
import Email from './PageOne/Email';
import PhoneNumber from './PageOne/PhoneNumber';
import NextButton from '../NextButton';
import BackButton from '../BackButton';
import AgeField from './PageOne/AgeCheck/AgeField';

import { pageOne, secondPage } from '../../lib/lang';
import ProgressBar from '../ProgressBar/ProgressBar';
import { updateLocalStorage } from '../../lib/localStorage';
import { PageOneSchema, PageOneT } from '../../lib/schema';

import 'react-datepicker/dist/react-datepicker.css';

const PageOne = () => {
  const { register, control, handleSubmit, watch } = useFormContext<PageOneT>();
  const navigate = useNavigate();
  const selectedAgeOption = watch('ageCheck'); // Watches the radio value
  const { errors, isValid: formValid } = useFormState({ control });

  const onSubmit: SubmitHandler<PageOneT> = async (data: PageOneT) => {
    const result = PageOneSchema.safeParse(data);
    if (result.success) {
      const { weight, weightUnit, height, heightUnit, ageCheck, ageField } =
        data;

      const updatedData = {
        ...data,
        weight: weight === 0 ? undefined : weight,
        weightUnit: weight === 0 ? undefined : weightUnit,
        height: height === 0 ? undefined : height,
        heightUnit: height === 0 ? undefined : heightUnit,
        ageField: ageCheck === 'no' ? undefined : ageField
      };

      updateLocalStorage(updatedData);
      navigate(`/${secondPage}`);
    }
  };

  return (
    <>
      <BackButton page={1} />
      <ProgressBar sections={4} page={1} />
      <h1>{pageOne.title}</h1>
      <form
        className="form"
        data-testid="page-one-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <ChildName registered={register('name')} errors={errors} />
        <Controller
          name="dob"
          control={control}
          render={({ field }) => {
            return <DateOfBirth {...field} error={errors['dob']} />;
          }}
        />
        <AgeCheck
          registered={register('ageCheck')}
          error={errors['ageCheck']}
        />
        {selectedAgeOption === 'yes' && (
          <AgeField registered={register('ageField')} errors={errors} />
        )}
        <IsThisChildAFatty
          registered={register('weight')}
          unitRegistered={register('weightUnit')}
          errors={errors}
        />
        <IsThisChildADwarf
          registered={register('height')}
          unitRegistered={register('heightUnit')}
          errors={errors}
        />
        <Email registered={register('email')} errors={errors} />
        <Controller
          name="phone"
          control={control}
          render={({ field }) => {
            return (
              <PhoneNumber
                {...field}
                control={control}
                error={errors['phone']}
              />
            );
          }}
        />
        <NextButton disabled={!formValid} page={1} />
      </form>
    </>
  );
};

export default PageOne;
