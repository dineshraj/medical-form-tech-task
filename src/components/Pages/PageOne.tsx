import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import validPhoneNumber from 'libphonenumber-js';

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
  errorForDate,
  errorForEmail,
  errorForName,
  errorForNumbers,
  errorForPhone,
  errorForThreeCharacters,
  pageOne
} from '../../lib/lang';

import 'react-datepicker/dist/react-datepicker.css';
import { parsePhoneNumber } from 'libphonenumber-js/core';

/* 
  STRATEGY
  ....each page has

  * a useState in the page that keeps track of the values as long as errors does not exist in the child (pushed to from the component by passing in an updateState callback) (something like onChange={(error) => updatePageState(error)} ?)
  * use an interface to check all types (maybe in a useEffect with a [pageState] so it checks when something changes)?
  * if they are all full then remove the disabled propr from the NextButton and when clicked, the handleSubmit button will preventDefault and the nextbutton internally will send stuff to local storage
*/

const PageOneSchema = z.object({
  name: z
    .string()
    .min(3, errorForThreeCharacters)
    .refine((value) => /^[A-Za-z]+$/.test(value), { message: errorForName }),
  dob: z.coerce.date().refine(
    (date) => {
      return date <= new Date();
    },
    { message: errorForDate }
  ),
  ageCheck: z.boolean(),
  weight: z.coerce
    .number({
      invalid_type_error: errorForNumbers
    })
    .optional(),

  weightUnit: z.string().optional(),
  height: z.coerce
    .number({
      invalid_type_error: errorForNumbers
    })
    .optional(),
  // .refine((value) => value && typeof value !== 'number', {
  //   message: errorForNumbers
  // }),
  heightUnit: z.string().optional(),
  email: z.string().email(errorForEmail),
  phone: z
    .string()
    .nullable()
    .transform((val) => val ?? '')
    .refine((value) => validPhoneNumber(value), { message: errorForPhone })
});

export type PageOne = z.infer<typeof PageOneSchema>;

const PageOne = () => {
  // const [selectedDate, setSelectedtDate] = useState<Date | null>(null);
  const [pageState, setPageState] = useState<PageOne | null>(null);
  const [pageFilled, setPageFilled] = useState(false);

  // useEffect(() => {}, [pageState]);

  const {
    register,
    control,
    formState: { errors }
  } = useForm<PageOne>({
    mode: 'onChange',
    resolver: zodResolver(PageOneSchema)
  });

  // const checkIfPageIsFilled = () => {
  //   return false;
  // };

  // const updatePageState = ({ target }: { target: HTMLInputElement }) => {
  //   console.log('trying...');
  //   console.log('🚀 ~ updatePageState ~ errors:', errors);
  //   const { name, value } = target;
  //   if (errors[name]?.message) return;

  //   setPageState((prevState) => {
  //     return {
  //       ...prevState,
  //       [name]: value
  //     };
  //   });
  // };

  console.log('🚀 ~ PageOne ~ errors:', errors);
  return (
    <>
      <h1>{pageOne.title}</h1>
      <form className="form" data-testid="page-one-form">
        <BackButton page={1} />
        <ChildName registered={register('name')} errors={errors} />
        <Controller
          name="dob"
          control={control}
          render={({ field }) => {
            return <DateOfBirth {...field} error={errors['dob']} />;
          }}
        />
        <AgeCheck />
        <IsThisChildAFatty registered={register('weight')} errors={errors} />
        <IsThisChildADwarf registered={register('height')} errors={errors} />
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
        <NextButton disabled={!pageFilled} page={1} />
      </form>
    </>
  );
};

export default PageOne;
