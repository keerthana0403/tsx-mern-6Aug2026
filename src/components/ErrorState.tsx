interface Props {
  message: string;
  onRetry: () => void;
}

const ErrorState = ({ message, onRetry }: Props) => {
  return (
    <div className="flex flex-col items-center py-20 gap-3 text-center">
      <p className="text-red-600 font-medium">
        Something went wrong: {message}
      </p>
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        Retry
      </button>
    </div>
  );
};

export default ErrorState;
