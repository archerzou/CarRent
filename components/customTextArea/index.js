import React from 'react';
import { ErrorMessage, useField } from 'formik';

const CustomTextArea = ({ placeholder, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div
      className={`${meta.touched && meta.error ? 'text-green-600' : ''}`}
    >
      <textarea
        name={field.name}
        rows={field.rows}
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

export default CustomTextArea;
