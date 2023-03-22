import React from 'react';

import CheckboxInput from '../checkboxInput';

const CarTypeFilter = ({ carTypes }) => (
  <div className="flex-col justify-start mx-auto">
    {carTypes.map((item, i) => (
      <CheckboxInput key={i} item={item} />
    ))}
  </div>
);

export default CarTypeFilter;
