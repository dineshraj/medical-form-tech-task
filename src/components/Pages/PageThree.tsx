import { useNavigate } from 'react-router-dom';

import BackButton from '../BackButton';

const PageThree = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return <BackButton page={3} handleOnClick={goBack} />;
};

export default PageThree;
