import DetailsItem from './DetailsItem';

import '../../../styles/Pages/PageTwoPointFive/DetailList.css';
import NextButton from '../../NextButton';
import { SubmitHandler, useFormContext, useFormState } from 'react-hook-form';
import { PageTwoPointFiveT } from '../../../lib/schema';

interface DetailsListProps {
  symptomDetails: string[];
  submitHandler: SubmitHandler<{ detailsItem: string[] }>;
}

const DetailsList = ({ symptomDetails, submitHandler }: DetailsListProps) => {
  const { control, handleSubmit /*, trigger */ } = useFormContext<PageTwoPointFiveT>();
  const { isValid: formValid } = useFormState({ control });

  return (
    <form
      name="detailsForm"
      className="form"
      data-testid="page-three-form"
      onSubmit={handleSubmit(submitHandler)}
    >
      <ul className="detail-list" data-testid="details-list">
        {symptomDetails.map((symptomDetail: string, i: number) => {
          return <DetailsItem key={i} index={i} detail={symptomDetail} />;
        })}
      </ul>
      <NextButton disabled={!formValid} page={25} />
    </form>
  );
};

export default DetailsList;
