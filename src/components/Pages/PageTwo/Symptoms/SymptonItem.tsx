import SymptomIcon from './SymptomIcon';
import colours from '../../../../lib/colours';
import '../../../../styles/Pages/PageTwo/SymptomItem.css';

const { iconDefaultColor } = colours;

export interface SymptomItemProps {
  name: string;
  info: string;
  id: string;
}
const SymptomItem = ({ name, info, id }: SymptomItemProps) => {
  return (
    <li data-id={id} className="symptom-item" data-testid="symptom-item">
      <input
        type="checkbox"
        className="symptom-item__checkbox"
        id={id}
        name={id}
      ></input>
      <label className="symptom-item__label" htmlFor={id}>
        <SymptomIcon fill={iconDefaultColor} />
        <div className="symptom-item__content">
          <h2 className="symptom-item__name">{name}</h2>
          <div className="symptom-item__info">{info}</div>
        </div>
      </label>
    </li>
  );
};

export default SymptomItem;
