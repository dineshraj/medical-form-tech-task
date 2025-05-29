import {
  Controller,
  SubmitHandler,
  // useForm,
  useFormContext,
  useFormState
} from 'react-hook-form';

import { useEffect } from 'react';
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
import PageOneSchema, { PageOneT } from '../../lib/schema';

import 'react-datepicker/dist/react-datepicker.css';

const PageOne = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { register, trigger, control, handleSubmit, watch } =
    useFormContext<PageOneT>();
  const navigate = useNavigate();

  // const { register, control, trigger, handleSubmit, watch } = useForm({
  //   mode: 'onChange',
  //   resolver: zodResolver(PageOneSchema)
  // });
  // const navigate = useNavigate();
  // This watches a component and returns it's value to be used in another component
  const selectedAgeOption = watch('ageCheck'); // Watches the radio value

  useEffect(() => {
    // * triggers validation for all fields in react-form-hook
    //TODO remove when debugging is done
    // trigger();
  }, []);

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
      // history.pushState(updatedData, '', secondPage);
      navigate(`/${secondPage}`);
    }
  };

  return (
    <>
      <ProgressBar sections={4} />
      <h1>{pageOne.title}</h1>
      <form
        className="form"
        data-testid="page-one-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <BackButton page={1} />
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
