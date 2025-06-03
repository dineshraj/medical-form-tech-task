import BackButton from '../BackButton';
import ProgressBar from '../ProgressBar/ProgressBar';

import { pageTwo } from '../../lib/lang';
import { SubmitHandler, useFormContext, useFormState } from 'react-hook-form';
import { PageTwoSchema, PageTwoT } from '../../lib/schema';
// import { FORM_KEY } from '../../App';

import { childSymptomsList } from '../../../src/data/';
import SymptomList from './PageTwo/Symptoms/SymptomList';
import NextButton from '../NextButton';
import {
  getFromLocalStorage,
  updateLocalStorage
} from '../../lib/localStorage';
// import { useEffect } from 'react';
// import { FORM_KEY } from '../../App';
// import { getFromLocalStorate } from '../../lib/localStorage';

const PageTwo = () => {
  const { control, handleSubmit /*, trigger */ } = useFormContext<PageTwoT>();
  const name = getFromLocalStorage('name');

  // useEffect(() => {
  //   trigger();
  // }, []);

  // // const name = localStorage.getItem(FORM_KEY).name;
  const { errors, isValid: formValid } = useFormState({ control });
  const errorMessage = errors['symptomItem']?.message as string;

  const onSubmit: SubmitHandler<PageTwoT> = async (data: PageTwoT) => {
    const result = PageTwoSchema.safeParse(data);

    if (result.success) {
      updateLocalStorage(data);
      // navigator(`/${thirdPage}`);
    }
  };

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
