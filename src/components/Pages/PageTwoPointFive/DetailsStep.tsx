import { SubmitHandler } from 'react-hook-form';
// import { pageThree } from '../../../lib/lang';

import DetailsList from './DetailsList';

interface DetailsStepProps {
  childName: string;
  symptomDetails: { name: string; symptoms: string[] };
  submitHandler: SubmitHandler<{ detailsItem: string[] }>;
}

const DetailsStep = ({
  // childName,
  symptomDetails,
  submitHandler
}: DetailsStepProps) => {
  console.log('🚀 ~ symptomDetails:', symptomDetails);
  const { symptoms } = symptomDetails;

  return (
    <div data-testid="details-step">
      <DetailsList symptomDetails={symptoms} submitHandler={submitHandler} />
    </div>
  );
};

export default DetailsStep;
