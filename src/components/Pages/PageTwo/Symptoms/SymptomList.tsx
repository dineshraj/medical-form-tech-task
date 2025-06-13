import SymptomItem from './SymptonItem';
import { SymptomItemProps } from './SymptonItem';

import '../../../../styles/Pages/PageTwo/SymptomList.css';

interface SymptomListProps {
  data: SymptomItemProps[];
}

const SymptomList = ({ data }: SymptomListProps) => {
  return (
    <ul className="symptom-list" data-testid="symptom-list">
      {data &&
        data.map((symptom: SymptomItemProps) => {
          return <SymptomItem key={symptom.id} {...symptom} />;
        })}
    </ul>
  );
};

export default SymptomList;
