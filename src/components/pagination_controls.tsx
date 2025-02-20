import { PaginationControlsProps } from "../types/order_record";

const PaginationControls: React.FC<PaginationControlsProps> = ({ page, pages, goToNextPage, goToPrevPage }) => (
    <div className="flex justify-between items-center p-4 bg-gray-100">
        <button
            onClick={goToPrevPage}
            disabled={page === 1}
            className={`px-4 py-2 rounded ${page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
        >
            Previous
        </button>
        <span className="text-gray-700">Page {page} of {pages}</span>
        <button
            onClick={goToNextPage}
            disabled={page >= pages}
            className={`px-4 py-2 rounded ${page >= pages ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
        >
            Next
        </button>
    </div>
);

export default PaginationControls;