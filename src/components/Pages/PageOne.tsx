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

// TODO get the unit working when you enter a height, but does not send if not

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

// const defaultPageOne: PageOne = {
//   name: '',
//   dob: new Date('January 17, 1988'),
//   ageCheck: false,
//   weight: undefined,
//   weightUnit: undefined,
//   height: undefined,
//   heightUnit: undefined,
//   email: '',
//   phone: ''
// };

export type PageOne = z.infer<typeof PageOneSchema>;

const PageOne = () => {
  // const [pageState, setPageState] = useState<PageOne>(defaultPageOne);
  // const [pageFilled, setPageFilled] = useState(false);

  // useEffect(() => {
  //   // console.log('pageState', pageState);
  // }, [pageState]);

  const { register, control, trigger, handleSubmit } = useForm({
    mode: 'onChange',
    resolver: zodResolver(PageOneSchema)
  });

  useEffect(() => {
    trigger(); // triggers validation for all fields
  }, []);

  const { errors, isValid: formValid } = useFormState({ control });
  console.log('🚀 ~ PageOne ~ formValid:', formValid);
  console.log('🚀 ~ PageOne ~ errors:', errors);

  // const updatePageState = async ({ target }: { target: HTMLInputElement }) => {
  //   const fieldName = target.name as keyof PageOne;
  //   // Trigger validation for the specific field
  //   const isValid = await trigger(fieldName);

  //   // TODO here I'll need to remove the entry if goes back into an error state
  //   if (errrs[fieldname.messgae]) return;

  //   const { value } = target;

  //   setPageState((prevState) => {


  //     return {
  //       ...prevState,
  //       [fieldName]: value
  //     };
  //   });
  // };

  // console.log('🚀 ~ PageOne ~ errors:', errors);

  const onSubmit: SubmitHandler<PageOne> = async (data) => {
    console.log('data', data);
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
        <ChildName
          registered={register('name', {
            // onChange: updatePageState
          })}
          errors={errors}
        />
        <Controller
          name="dob"
          control={control}
          render={({ field }) => {
            return (
              <DateOfBirth
                {...field}
                // onChange={(date: Date | null) => {
                //   field.onChange(date); // react hook form onChange
                //   updatePageState({
                //     target: {
                //       name: field.name,
                //       value: date
                //     }
                //   })
                // }}
                error={errors['dob']}
              />
            );
          }}
        />
        <AgeCheck registered={register('ageCheck')} errors={errors} />
        <IsThisChildAFatty registered={register('weight')} unitRegistered={register('weightUnit')} errors={errors} />
        <IsThisChildADwarf registered={register('height')}  unitRegistered={register('heightUnit')} errors={errors} />
        <Email
          registered={register(
            'email'
            //   {
            //   required: true,
            //   pattern: {
            //     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            //     message: errorForEmail
            //   }
            // }
          )}
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
        <NextButton disabled={!formValid} page={1} />
      </form>
    </>
  );
};

export default PageOne;
