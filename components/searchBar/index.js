import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { RiSearch2Line } from 'react-icons/ri';

const SearchBar = ({ searchHandler }) => {
  const router = useRouter();
  const [query, setQuery] = useState(router.query.search || '');
  const handleSearch = (e) => {
    e.preventDefault();
    if (router.pathname !== '/searchcar') {
      if (query.length > 1) {
        router.push(`/searchcar?search=${query}`);
      }
    } else {
      searchHandler(query);
    }
  };
  return (
    <form
      className="items-center mt-8"
      onSubmit={(e) => handleSearch(e)}
    >
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search brand or title"
          className="block bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg w-full pl-8 p-2.5"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <RiSearch2Line className="text-gray-500 absolute top-3 left-3 flex items-center pointer-events-none" />

      </div>

    </form>
  );
};
export default SearchBar;
