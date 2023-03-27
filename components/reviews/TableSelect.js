import { useState } from 'react';
import { IoArrowDown } from 'react-icons/io5';

const TableSelect = ({ property, text, data, handleChange }) => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="mt-1 flex items-center gap-3 text-sm font-sm w-full ">
      {text}:
      <div
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2"
        onClick={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        <span className="flex px-2">
          {property || `Select ${text}`}
          <IoArrowDown />
        </span>
        {visible && (
          <ul
            className="bg-white border-gray-300 z-10 shadow-sm p-2"
            onClick={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            style={{ width: text === 'Order' && '200px' }}
          >
            {data.map((item, i) => {
              if (text === 'Rating') {
                return (
                  <li key={i} onClick={() => handleChange(item.value)}>
                    <span>{item.text}</span>
                  </li>
                );
              }

              return (
                <li
                  style={{ width: text === 'Order' && '200px' }}
                  key={i}
                  onClick={() => handleChange(item.value)}
                >
                  <span>{item.text}</span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TableSelect;
