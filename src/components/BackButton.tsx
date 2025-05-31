import { back } from '../lib/lang';
import BackIcon from './BackIcon';

import '../styles/BackButton.css';

interface BackButtonProps {
  page: number;
}

const BackButton = ({ page }: BackButtonProps) => {
  return (
    <div className="back-button-wrapper" data-testid="back-button-wrapper">
      {page !== 1 && (
        <button data-testid="back-button" className="back-button">
          {back}
          <BackIcon />
        </button>
      )}
    </div>
  );
};

export default BackButton;
