interface Props {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isFetching: boolean;
}

const Pagination = ({ page, totalPages, onPageChange, isFetching }: Props) => {
  const canGoPrev = page > 1;
  const canGoNext = page < totalPages;

  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={!canGoPrev || isFetching}
        className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
      >
        Previous
      </button>

      <span className="text-sm text-gray-600">
        Page {page} of {totalPages}
        {isFetching && <span className="ml-2 text-indigo-500">(loading…)</span>}
      </span>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={!canGoNext || isFetching}
        className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
