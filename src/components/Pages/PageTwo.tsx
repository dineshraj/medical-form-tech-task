import BackButton from '../BackButton';
import ProgressBar from '../ProgressBar/ProgressBar';

import { pageTwo } from '../../lib/lang';
import { useFormContext, useFormState } from 'react-hook-form';
import { PageTwoT } from '../../lib/schema';
import { FORM_KEY } from '../../App';

import { childSymptomsList } from '../../../src/data/';
import SymptomList from './PageTwo/Symptoms/SymptomList';
import NextButton from '../NextButton';

const PageTwo = () => {
  const { getValues, control, handleSubmit } = useFormContext<PageTwoT>();
  const name =
    getValues('name') || JSON.parse(localStorage.getItem(FORM_KEY)!).name;
  const { errors, isValid: formValid } = useFormState({ control });

  const onSubmit = () => {};

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
        name="symptom-form"
        className="symptom-form"
        data-testid="page-one-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <SymptomList data={childSymptomsList} />
        <NextButton disabled={!formValid} page={1} />
      </form>
    </>
  );
};

export default PageTwo;
