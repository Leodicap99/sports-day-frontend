import { memo, useState, useRef, useEffect } from "react";
import SortIcon from "@mui/icons-material/Sort"; // Import the Sort icon

const EventSearch = memo(({ handleFilterEvents, handleSortEvents }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef(null);
  const [toggleSort,setToggleSort] = useState('asc');
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleFilterEvents(value);
  };
  const handleClickSort = () => {
    handleSortEvents(toggleSort);
    setToggleSort(prev=>{
        if(prev==='asc')return 'desc';
        else if(prev==='desc')return 'normal';
        return 'asc';
    });
  }
  return (
    <div className="flex items-center mt-6 mb-10 justify-center">
      <div className="relative w-full max-w-lg">
        <input
          type="text"
          value={searchTerm}
          ref={inputRef}
          className="border rounded-md w-full py-2 px-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white text-sm sm:text-base"
          placeholder="Search event name or category"
          onChange={handleChange}
        />
        <svg
          className="w-6 h-6 text-gray-400 absolute left-3 top-2 dark:text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35"
          />
        </svg>
      </div>
      <button
        onClick={handleClickSort}
        data-testid="sort-button"
        className="ml-4 flex items-center bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600 transition duration-200 dark:bg-blue-700 dark:hover:bg-blue-800"
      >
        <SortIcon className="mr-2" />
      </button>
    </div>
  );
});

export default EventSearch;
