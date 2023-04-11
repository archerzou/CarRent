import React, { useState } from 'react';
import TableSelect from './TableSelect';

const orderOptions = [
  {
    text: 'Recommended',
    value: 'Recommended',
  },
  {
    text: 'Most recent to oldest',
    value: 'Most recent to oldest',
  },
  {
    text: 'Oldest to most recent',
    value: 'Oldest to most recent',
  },
];

const TableHeader = () => {
  const [order, setOrder] = useState();
  return (
    <div className="grid grid-cols-1">
      <TableSelect
        property={order}
        text="Order"
        data={orderOptions.filter((x) => x.value !== order)}
        handleChange={setOrder}
      />
    </div>
  );
};

export default TableHeader;
