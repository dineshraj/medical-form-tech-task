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
import { PageThreeSchema, PageThreeT } from '../../lib/schema';
import { thirdhPage, pageTwoPointFive } from '../../lib/lang';

const PageTwoPointFive = () => {
  const navigate = useNavigate();
  const symptomItems: string[] = getFromLocalStorage('symptomItem');

  // TODO setStep to step+1 when the user clicks next, but check this against the symptomItems length
  const [step, setStep] = useState(0);
  // const [symptomObject, setSymptomObject] = useState(0);
  const childName = getFromLocalStorage('name');

  //TODO choose symptomItems[step] to display correct array
  console.log('🚀 ~ PageThree ~ symptomItems:', symptomItems);

  // const maxSteps = symptomItems.length - 1 ;

  const getSymptomDetails = useCallback(() => {
    console.log(
      '🚀 ~ getSymptomDetails ~ symptomItems[step]:',
      symptomItems[step]
    );
    return childSymptomsType.filter((symptom) => {
      console.log('🚀 ~ returnchildSymptomsType.filter ~ symptom:', symptom);
      console.log(
        '🚀 ~ returnchildSymptomsType.filter ~ symptom.name === symptomItems[step]:',
        symptom.name === symptomItems[step]
      );
      return symptom.name === symptomItems[step];
    });
  }, [step]);

  const goBack = () => {
    navigate(-1);
  };

  const hasNoMoreSteps = () => {
    console.log('🚀 ~ hasNoMoreSteps ~ step:', step);
    console.log('🚀 ~ hasNoMoreSteps ~ symptomItems:', symptomItems.length);
    return step === symptomItems.length - 1;
  };

  const onSubmit: SubmitHandler<PageThreeT> = async (data: PageThreeT) => {
    const result = PageThreeSchema.safeParse(data);
    console.log(
      '🚀 ~ constonSubmit:SubmitHandler<PageThreeT>= ~ data:',
      data,
      symptomItems[step]
    );

    const updatedData = {
      detailsItem: {
        [symptomItems[step]]: [...data.detailsItem]
      }
    };
    console.log('submitting...!!!!');

    if (result.success) {
      updateLocalStorage(updatedData);

      if (hasNoMoreSteps()) {
        console.log('no more steps because the length is', symptomItems.length);

        navigate(`/${thirdhPage}`);
      } else {
        console.log('there is enother step, which is', symptomItems[step + 1]);

        setStep((prevStep) => prevStep + 1);
      }
    }
  };

  const symptomDetails = getSymptomDetails();
  console.log('step', step);

  console.log('🚀 ~ PageThree ~ symptomDetails:', symptomDetails);
  console.log('🚀 ~ PageThree ~ symptomITEMS:', symptomItems);

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
