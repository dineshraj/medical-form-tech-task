import { useNavigate } from 'react-router';

import BackButton from '../BackButton';
import { pageThree } from '../../lib/lang';
import ProgressBar from '../ProgressBar/ProgressBar';
import { useFormContext } from 'react-hook-form';
import { PageThreeT } from '../../lib/schema';

const PageThree = () => {
  const { control, handleSubmit /*, trigger */ } = useFormContext<PageThreeT>();
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <BackButton page={3} handleOnClick={goBack} />
      <ProgressBar sections={4} page={3} />
      <h1>{pageThree.title}</h1>
    </>
  );
};

export default PageThree;
