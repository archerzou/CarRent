import { useField, ErrorMessage } from 'formik';
import { useEffect, useState, useRef } from 'react';

const ShippingInput = ({ placeholder, ...props }) => {
  const inputRef = useRef(null);
  const [field, meta] = useField(props);
  const [move, setMove] = useState(false);
  useEffect(() => {
    if (field.value.length > 0) {
      setMove(true);
    } else {
      setMove(false);
    }
  }, [field.value]);

  return (
    <div
      className={` ${meta.touched && meta.error ? 'text-green-600' : ''}`}
    >
      <div
        onFocus={() => setMove(true)}
        onBlur={() => setMove(field.value.length > 0)}
      >
        <input
          ref={inputRef}
          type={field.type}
          name={field.name}
          {...field}
          {...props}
        />
        <span
          className={move ? 'text-sm' : ''}
          onClick={() => {
            inputRef.current.focus();
            setMove(true);
          }}
        >
          {placeholder}
        </span>
      </div>
      <p>{meta.touched && meta.error && <ErrorMessage name={field.name} />}</p>
    </div>
  );
};

export default ShippingInput;
