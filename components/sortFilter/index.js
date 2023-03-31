import { sortingOptions } from '../../constants';

const SortFilter = ({ sortHandler }) => (
  <div className="flex items-center space-x-2">
    <p className="w-full text-gray-900 text-lg ">Sort by</p>
    <select
      className="bg-gray-200 border p-2 border-gray-300 text-gray-900 text-sm rounded-lg"
      defaultValue=""
      onChange={(e) => sortHandler(e.target.value)}
    >
      {sortingOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
  </div>
);

export default SortFilter;
