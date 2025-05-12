import ProgressBarItem from './ProgressBarItem';
import '../../styles/ProgressBar/ProgressBar.css';
import colours from '../../lib/colours';

const { highlightedProgress, nonHighlightedProgress } = colours;

interface ProgressBarProps {
  sections: number;
}
const renderProgressBars = (sections: number) => {
  return Array.from({ length: sections }, (_, index) => (
    <ProgressBarItem
      key={index}
      color={index == 0 ? highlightedProgress : nonHighlightedProgress}
    />
  ));
};

const ProgressBar = ({ sections }: ProgressBarProps) => {
  return (
    <div className="progress-bar" data-testid="progress-bar">
      {renderProgressBars(sections)}
    </div>
  );
};

export default ProgressBar;
