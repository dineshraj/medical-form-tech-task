import { back } from '../lib/lang';

interface BackButtonProps {
  page: number;
}

const BackButton = ({ page }: BackButtonProps) => {
  return (
    <div className="back-button-wrapper" data-testid="back-button-wrapper">
      {page !== 1 && <button data-testid="back-button">{back}</button>}
    </div>
  );
};

export default BackButton;
