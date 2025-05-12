import '../../styles/ProgressBar/ProgressBarItem.css';

interface ProgressBarItemProps {
  color: string;
}

const ProgressBarItem = ({ color }: ProgressBarItemProps) => {
  return (
    <div
      className="progress-bar__item"
      data-testid="progress-bar__item"
      style={{ backgroundColor: color }}
    />
  );
};

export default ProgressBarItem;
