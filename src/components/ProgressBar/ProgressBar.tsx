import ProgressBarItem from './ProgressBarItem';
import '../../styles/ProgressBar/ProgressBar.css';
import colours from '../../lib/colours';

const { highlightedProgress, nonHighlightedProgress } = colours;

interface ProgressBarProps {
  sections: number;
  page: number;
}
const renderProgressBars = (sections: number, page: number) => {
  return Array.from({ length: sections }, (_, index) => {
    return (
      <ProgressBarItem
        key={index}
        color={index + 1 <= page ? highlightedProgress : nonHighlightedProgress}
      />
    );
  });
};

const ProgressBar = ({ sections, page }: ProgressBarProps) => {
  return (
    <div className="progress-bar" data-testid="progress-bar">
      {renderProgressBars(sections, page)}
    </div>
  );
};

export default ProgressBar;
