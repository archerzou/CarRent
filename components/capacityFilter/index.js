import React from 'react';

import CheckboxInput from '../checkboxInput';

const CapacityFilter = ({ capacities }) => (
  <div className="flex-col justify-start mx-auto">
    {capacities.map((item, i) => (
      <CheckboxInput key={i} item={`${item} Person`} />
    ))}
  </div>
);

export default CapacityFilter;
