import {
  Controller,
  SubmitHandler,
  useForm,
  useFormState
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { parsePhoneNumberFromString } from 'libphonenumber-js';

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
  errorForAge,
  errorForDate,
  errorForEmail,
  errorForName,
  errorForNumbers,
  errorForPhone,
  errorForThreeCharacters,
  pageOne
} from '../../lib/lang';

import 'react-datepicker/dist/react-datepicker.css';
import { useEffect } from 'react';
import { updateLocalStorage } from '../../lib/localStorage';

// TODO get the unit working when you enter a height, but does not send if not

const PageOneSchema = z.object({
  name: z
    .string()
    .min(3, errorForThreeCharacters)
    .refine((value) => /^[A-Za-z]+$/.test(value), { message: errorForName }),
  dob: z.coerce
    .date()
    .refine((date) => date <= new Date(), { message: errorForDate }),
  ageCheck: z.string({ message: errorForAge }),
  weight: z.coerce
    .number({
      invalid_type_error: errorForNumbers
    })
    .optional(),
  weightUnit: z.union([z.string(), z.literal('kg')]),
  height: z.coerce
    .number({
      invalid_type_error: errorForNumbers
    })
    .optional(),
  heightUnit: z.union([z.string(), z.literal('cm')]),
  email: z.string().email(errorForEmail),
  phone: z.coerce
    .string()
    .transform((val) => val ?? '')
    .refine(
      (value) => {
        try {
          return parsePhoneNumberFromString(value)?.isValid();
        } catch {
          return false;
        }
      },
      { message: errorForPhone }
    )
});

export type PageOne = z.infer<typeof PageOneSchema>;

const PageOne = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { register, control, trigger, handleSubmit } = useForm({
    mode: 'onChange',
    resolver: zodResolver(PageOneSchema)
  });

  useEffect(() => {
    // * triggers validation for all fields in react-form-hook
    //TODO remove when debugging is done
    // trigger();
  }, []);

  const { errors, isValid: formValid } = useFormState({ control });

  const onSubmit: SubmitHandler<PageOne> = async (data) => {
    const { weight, weightUnit, height, heightUnit } = data;

    const updatedData = {
        ...data,
        weight: weight === 0 ? undefined : weight,
        weightUnit: weight === 0 ? undefined : weightUnit,
        height: height === 0 ? undefined : height,
        heightUnit: height === 0 ? undefined : heightUnit
    };

    updateLocalStorage(updatedData);
  };

  return (
    <>
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
        <AgeCheck registered={register('ageCheck')} errors={errors} />
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
