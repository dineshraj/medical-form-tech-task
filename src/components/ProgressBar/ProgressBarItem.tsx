import '../../styles/ProgressBar/ProgressBarItem.css';

interface ProgressBarItemProps {
  color?: string;
}

const ProgressBarItem = ({ color = '#f2f2f2' }: ProgressBarItemProps) => {
  return (
    <div
      className="progress-bar__item"
      data-testid="progress-bar__item"
      style={{ backgroundColor: color }}
    ></div>
  );
};

export default ProgressBarItem;
