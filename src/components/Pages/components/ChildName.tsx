import { errorForThreeCharacters, pageOne } from '../../../lang';
import { UseFormRegisterReturn } from 'react-hook-form';

interface ChildNameProps {
  registered: UseFormRegisterReturn<"name">
  errorCondition: boolean;
}

const ChildName = ({ registered, errorCondition }: ChildNameProps) => {
  return (
    <label htmlFor="name" data-testid="child-name-label">
      {pageOne.childsName}
      <input
        {...registered}
        className={
          errorCondition
            ? 'error-border'
            : ''
        }
        placeholder="Alice"
        id="name"
        data-testid="child-name-input"
      />
      {errorCondition && (
        <p className="error-text">{errorForThreeCharacters}</p>
      )}
    </label>
  );
};

export default ChildName;
