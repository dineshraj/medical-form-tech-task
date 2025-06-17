import { useNavigate } from 'react-router';

import BackButton from '../BackButton';
import { pageThree, fourthPage} from '../../lib/lang';
import ProgressBar from '../ProgressBar/ProgressBar';
import { SubmitHandler, useFormContext, useFormState } from 'react-hook-form';
import { PageThreeSchema, PageThreeT } from '../../lib/schema';
import TextArea from './PageThree/TextArea';
import NextButton from '../NextButton';
import { updateLocalStorage } from '../../lib/localStorage';

const PageThree = () => {
  const { control, register, handleSubmit /*, trigger */ } =
    useFormContext<PageThreeT>();
  const navigate = useNavigate();

  const { isValid: formValid } = useFormState({ control });

  const goBack = () => {
    navigate(-1);
  };

  const onSubmit: SubmitHandler<PageThreeT> = async (data: PageThreeT) => {

    const result = PageThreeSchema.safeParse(data);

    if (result.success) {
      updateLocalStorage(data);
      navigate(`/${fourthPage}`);
    }
  };

  return (
    <>
      <BackButton page={3} handleOnClick={goBack} />
      <ProgressBar sections={4} page={3} />
      <h1>{pageThree.title}</h1>

      <form
        className="form"
        data-testid="page-three-form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextArea registered={register('otherInfo')}></TextArea>
        <NextButton disabled={!formValid} page={3} />
      </form>
    </>
  );
};

export default PageThree;
