import { useNavigate } from 'react-router';
import { SubmitHandler, useFormContext, useFormState } from 'react-hook-form';

import { childSymptomsList } from '../../../src/data/';
import { pageTwo, secondPagePt2 } from '../../lib/lang';
import { PageTwoSchema, PageTwoT } from '../../lib/schema';
import {
  updateLocalStorage,
  getFromLocalStorage
} from '../../lib/localStorage';

import SymptomList from './PageTwo/Symptoms/SymptomList';
import NextButton from '../NextButton';
import BackButton from '../BackButton';
import ProgressBar from '../ProgressBar/ProgressBar';

const PageTwo = () => {
  const { control, handleSubmit /*, trigger */ } = useFormContext<PageTwoT>();
  const navigate = useNavigate();

  const name = getFromLocalStorage('name');
  const { isValid: formValid } = useFormState({ control });
  // const errorMessage = errors['symptomItem']?.message as string;

  const goBack = () => {
    navigate(-1);
  };

  const onSubmit: SubmitHandler<PageTwoT> = async (data: PageTwoT) => {
    const result = PageTwoSchema.safeParse(data);

    if (result.success) {
      updateLocalStorage(data);
      navigate(`/${secondPagePt2}`);
    }
  };

  return (
    <>
      <BackButton page={2} handleOnClick={goBack} />
      <ProgressBar sections={4} page={2} />
      <h1>{`${name} ${pageTwo.title}`}</h1>
      {
        <form
          name="symptomForm"
          className="form"
          data-testid="page-two-form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <SymptomList data={childSymptomsList} />
          <NextButton disabled={!formValid} page={2} />
        </form>
      }
      {/* {errorMessage && <p className="error-text">{errorMessage}</p>} */}
    </>
  );
};

export default PageTwo;
