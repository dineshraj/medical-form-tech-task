import { useFormContext } from 'react-hook-form';
import DetailsIcon from './DetailsIcon';

import '../../../styles/Pages//PageTwoPointFive/DetailItem.css';

export interface DetailsItemProps {
  detail: string;
  index: number;
}

const DetailsItem = ({ detail, index }: DetailsItemProps) => {
  const { register } = useFormContext();
  const id = `detailItem${index}-label`;

  return (
    <li className="detail-item" data-testid="detail-item">
      <input
        type="checkbox"
        className="detail-item__checkbox"
        id={id}
        {...register('detailsItem')}
        name="detailsItem"
        value={detail}
        data-testid="detail-input"
      ></input>
      <label className="detail-item__label" data-testid={id} htmlFor={id}>
        <DetailsIcon />
        <div className="detail-item__content">
          <p className="detail-item__name">{detail}</p>
        </div>
      </label>
    </li>
  );
};

export default DetailsItem;
