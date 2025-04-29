import ProgressBarItem from './ProgressBarItem';
import '../../styles/ProgressBar/ProgressBar.css';
import colours from '../../colours';

const { highlightedProgress } = colours;

interface ProgressBarProps {
  sections: number;
}

const ProgressBar = ({ sections }: ProgressBarProps) => {
  const items = [];
  for (let index = 0; index < sections; index++) {
    if (index === 0) {
      items.push(<ProgressBarItem key={index} color={highlightedProgress} />);
    } else {
      items.push(<ProgressBarItem key={index} />);
    }
  }

  return (
    <div className="progress-bar" data-testid="progress-bar">
      {items}
    </div>
  );
};

export default ProgressBar;
