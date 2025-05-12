import { next } from '../../lib/lang';

import '../../styles/NextButton.css';

interface NextButtonProps {
  disabled?: boolean;
}

const NextButton = ({ disabled = true }: NextButtonProps) => {
  return (
    <button
      className="next-button"
      disabled={disabled}
      data-testid="next-button"
    >
      {next}
    </button>
  );
};

export default NextButton;
