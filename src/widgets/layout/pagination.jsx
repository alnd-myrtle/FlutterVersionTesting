const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];

  // Calculate the page numbers to display
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <nav className="mt-10 flex justify-center">
      <ul className="flex">
        {pages.map((page) => (
          <li key={page}>
            <a
              href="#"
              className={`mx-1 block rounded border border-gray-400 py-2 px-4 ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : "text-gray-700"
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
