import { SubmitHandler } from 'react-hook-form';

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
  const { symptoms } = symptomDetails;

  return (
    <div data-testid="details-step">
      <DetailsList symptomDetails={symptoms} submitHandler={submitHandler} />
    </div>
  );
};

export default DetailsStep;
