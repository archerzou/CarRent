import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { RiSearch2Line } from 'react-icons/ri';

const SearchBar = ({ searchHandler }) => {
  const router = useRouter();
  const [query, setQuery] = useState(router.query.search || '');
  const handleSearch = (e) => {
    e.preventDefault();
    if (router.pathname !== '/browse') {
      if (query.length > 1) {
        router.push(`/browse?search=${query}`);
      }
    } else {
      searchHandler(query);
    }
  };
  return (
    <form
      className="flex items-center mt-3 sm: hidden"
      onSubmit={(e) => handleSearch(e)}
    >
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search something here"
          className="block bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg w-full pl-6 p-2.5"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="absolute top-0 right-0 p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700"
        >
          <RiSearch2Line className="w-5 h-5" />
        </button>
      </div>

    </form>
  );
};
export default SearchBar;
