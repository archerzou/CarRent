import React from 'react';
import { ErrorMessage, useField } from 'formik';

const CustomInput = ({ placeholder, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div
      className={`${meta.touched && meta.error ? 'text-green-600' : ''}`}
    >
      <input
        type={field.type}
        name={field.name}
        placeholder={placeholder}
        {...field}
        {...props}
      />
      {meta.touched && meta.error && (
      <div className="text-red-600">
        <span />
        <ErrorMessage name={field.name} />
      </div>
      )}
    </div>
  );
};

export default CustomInput;
