interface ErrorProps {
  error: string;
}

const ErrorMessage = ({ error }: ErrorProps) => {
  return (
    <p className="error-text" data-testid="error-message">
      {error}
    </p>
  );
};

export default ErrorMessage;
