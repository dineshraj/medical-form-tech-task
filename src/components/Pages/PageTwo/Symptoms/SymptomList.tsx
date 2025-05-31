import SymptomItem from './SymptonItem';
import { SymptomItemProps } from './SymptonItem';

import '../../../../styles/Pages/PageTwo/SymptomList.css';

interface SymptomList {
  data: SymptomItemProps[];
}

const SymptomList = ({ data }: SymptomList) => {
  return (
    <div className="symptom-list" data-testid="symptom-list">
      {data &&
        data.map((symptom: SymptomItemProps, i) => {
          return <SymptomItem key={i} {...symptom} />;
        })}
    </div>
  );
};

export default SymptomList;
