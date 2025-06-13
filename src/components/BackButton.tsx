import { back } from '../lib/lang';
import BackIcon from './BackIcon';

import '../styles/BackButton.css';
import { MouseEventHandler } from 'react';

interface BackButtonProps {
  page: number;
  handleOnClick?: MouseEventHandler<HTMLButtonElement>;
}

const BackButton = ({ page, handleOnClick }: BackButtonProps) => {
  return (
    <div className="back-button-wrapper" data-testid="back-button-wrapper">
      {page !== 1 && (
        <button data-testid="back-button" className="back-button" onClick={handleOnClick}>
          {back}
          <BackIcon />
        </button>
      )}
    </div>
  );
};

export default BackButton;
