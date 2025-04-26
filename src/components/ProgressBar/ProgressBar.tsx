import ProgressBarItem from './ProgressBarItem';
import '../../styles/ProgressBar/ProgressBar.css';

interface ProgressBarProps {
  sections: number;
}

const ProgressBar = ({ sections }: ProgressBarProps) => {
  const items = [];
  for (let index = 0; index < sections; index++) {
    items.push(<ProgressBarItem key={index} />);
  }

  return (
    <div className="progress-bar" data-testid="progress-bar">
      {items}
    </div>
  );
};

export default ProgressBar;
