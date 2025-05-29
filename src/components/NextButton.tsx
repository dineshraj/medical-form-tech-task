import { next } from '../lib/lang';

import '../styles/NextButton.css';

interface NextButtonProps {
  disabled: boolean;
  page: number;
}

const NextButton = ({ disabled, page }: NextButtonProps) => {
  return (
    <button
      className="next-button"
      disabled={disabled}
      type="submit"
      data-testid={`next-button-page-${page}`}
    >
      {next}
    </button>
  );
};

export default NextButton;
