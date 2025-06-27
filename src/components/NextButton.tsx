import { next } from '../lib/lang';

import '../styles/NextButton.css';

interface NextButtonProps {
  disabled: boolean;
  page: number;
  text?: string;
}


const NextButton = ({ disabled, page, text }: NextButtonProps) => {
  return (
    <button
      className="next-button"
      disabled={disabled}
      type="submit"
      data-testid={`next-button-page-${page}`}
    >
      {text || next}
    </button>
  );
};

export default NextButton;
