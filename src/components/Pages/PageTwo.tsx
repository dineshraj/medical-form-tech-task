import BackButton from '../BackButton';
import ProgressBar from '../ProgressBar/ProgressBar';

import { pageTwo } from '../../lib/lang';
import { SubmitHandler, useFormContext, useFormState } from 'react-hook-form';
import { PageTwoSchema, PageTwoT } from '../../lib/schema';
// import { FORM_KEY } from '../../App';

import { childSymptomsList } from '../../../src/data/';
import SymptomList from './PageTwo/Symptoms/SymptomList';
import NextButton from '../NextButton';
import { getFromLocalStorage } from '../../lib/localStorage';
import { useEffect } from 'react';
// import { FORM_KEY } from '../../App';
// import { getFromLocalStorate } from '../../lib/localStorage';

const PageTwo = () => {
  const { control, handleSubmit, trigger } = useFormContext<PageTwoT>();
  const name = getFromLocalStorage('name');

  // useEffect(() => {
  //   trigger();
  // }, []);

  // // const name = localStorage.getItem(FORM_KEY).name;
  const { errors, isValid: formValid } = useFormState({ control });
  // console.log('🚀 ~ PageTwo ~ errors:', errors);
  const errorMessage = errors['symptomItem']?.message as string;

  const onSubmit: SubmitHandler<PageTwoT> = async (data: PageTwoT) => {
    const result = PageTwoSchema.safeParse(data);
  };

  // TODO page one for reference- delete
  // const onSubmit: SubmitHandler<PageOneT> = async (data: PageOneT) => {
  //   const result = PageOneSchema.safeParse(data);
  //   if (result.success) {
  //     const { weight, weightUnit, height, heightUnit, ageCheck, ageField } =
  //       data;

  //     const updatedData = {
  //       ...data,
  //       weight: weight === 0 ? undefined : weight,
  //       weightUnit: weight === 0 ? undefined : weightUnit,
  //       height: height === 0 ? undefined : height,
  //       heightUnit: height === 0 ? undefined : heightUnit,
  //       ageField: ageCheck === 'no' ? undefined : ageField
  //     };

  //     updateLocalStorage(updatedData);
  //     navigate(`/${secondPage}`);
  //   }
  // };
  return (
    <>
      <BackButton page={2} />
      <ProgressBar sections={4} page={2} />
      <h1>{`${name} ${pageTwo.title}`}</h1>
      <form
        name="symptomForm"
        className="form"
        data-testid="page-two-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <SymptomList data={childSymptomsList} />
        <NextButton disabled={!formValid} page={2} />
      </form>
      {errorMessage && <p className="error-text">{errorMessage}</p>}
    </>
  );
};

export default PageTwo;
