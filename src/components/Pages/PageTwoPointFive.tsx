import BackButton from '../BackButton';
import ProgressBar from '../ProgressBar/ProgressBar';
import {
  getFromLocalStorage,
  updateLocalStorage
} from '../../lib/localStorage';
import { childSymptomsType } from '../../data';
import DetailsStep from './PageTwoPointFive/DetailsStep';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import { SubmitHandler } from 'react-hook-form';
import { PageTwoPointFiveSchema, PageTwoPointFiveT } from '../../lib/schema';
import { thirdPage, pageTwoPointFive } from '../../lib/lang';

 //! TODO make each step of PageTwoPointFive have a subroute so the back button works properly on Page 3

const PageTwoPointFive = () => {
  const navigate = useNavigate();
  const symptomItems: string[] = getFromLocalStorage('symptomItem');
  const [step, setStep] = useState(0);
  const childName = getFromLocalStorage('name');

  const getSymptomDetails = useCallback(() => {
    return childSymptomsType.filter((symptom) => {
      return symptom.name === symptomItems[step];
    });
  }, [step]);

  const goBack = () => {
    navigate(-1);
  };

  const hasNoMoreSteps = () => {
    return step === symptomItems.length - 1;
  };

  const onSubmit: SubmitHandler<PageTwoPointFiveT> = async (data: PageTwoPointFiveT) => {
    const result = PageTwoPointFiveSchema.safeParse(data);

    const updatedData = {
      detailsItem: {
        [symptomItems[step]]: [...data.detailsItem]
      }
    };

    if (result.success) {
      updateLocalStorage(updatedData);

      if (hasNoMoreSteps()) {
        navigate(`/${thirdPage}`);
      } else {
        setStep((prevStep) => prevStep + 1);
      }
    }
  };

  const symptomDetails = getSymptomDetails();

  return (
    <>
      <BackButton page={3} handleOnClick={goBack} />
      <ProgressBar sections={4} page={2} />
      <h1>
        {`${pageTwoPointFive.title} ${childName}'s ${symptomItems[
          step
        ].toLowerCase()}`}{' '}
        ({`${step + 1}/${symptomItems.length}`})
      </h1>
      <DetailsStep
        childName={childName}
        symptomDetails={symptomDetails[0]}
        submitHandler={onSubmit}
      />
    </>
  );
};

export default PageTwoPointFive;
