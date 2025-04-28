const Pagination = ({ previousPage, page, nextPage, hasMorePages }) => {
  return (
    <div className="flex justify-center items-center gap-4 mt-6">
      <button
        onClick={previousPage}
        disabled={page === 1}
        className={`px-4 py-2 rounded-lg ${
          page === 1
            ? "bg-gray-200 text-gray-500"
            : "bg-sky-500 text-white hover:bg-sky-600"
        }`}
      >
        Previous
      </button>
      <span className="text-sky-700 font-medium">Page {page}</span>
      <button
        onClick={nextPage}
        disabled={!hasMorePages}
        className={`px-4 py-2 rounded-lg ${
          !hasMorePages
            ? "bg-gray-200 text-gray-500"
            : "bg-sky-500 text-white hover:bg-sky-600"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
