import '../styles/Form.css';
import ProgressBar from './ProgressBar/ProgressBar';

const Form = () => {
  return (
    <div className="form-container" data-testid="form-container">
      <ProgressBar sections={4} />
    </div>
  );
};

export default Form;
