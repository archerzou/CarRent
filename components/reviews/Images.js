import React, { useState, useRef } from 'react';

import { RiDeleteBin6Line } from 'react-icons/ri';

const Images = ({ images, setImages }) => {
  const [error, setError] = useState('');
  const inputRef = useRef(null);
  const handleImages = (e) => {
    let files = Array.from(e.target.files);
    console.log(files);
    files.forEach((img, i) => {
      if (images.length === 3 || i === 2) {
        setError('Maximum 3 images are allowed.');
        return;
      }
      if (
        img.type !== 'image/jpeg'
        && img.type !== 'image/png'
        && img.type !== 'image/jpg'
        && img.type !== 'image/webp'
      ) {
        setError(
          `${img.name} format is unsupported ! only JPEG, PNG, WEBP are allowed.`,
        );
        files = files.filter((item) => item.name !== img.name);
      } else if (img.size > 1024 * 1024 * 5) {
        setError(`${img.name} size is too large max 5mb allowed.`);
        files = files.filter((item) => item.name !== img.name);
      } else {
        setError('');
        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = (e) => {
          setImages((images) => [...images, e.target.result]);
        };
      }
    });
  };
  const removeImage = (image) => {
    setImages((images) => images.filter((img) => img !== image));
    if (images.length <= 3) {
      setError('');
    }
  };
  return (
    <div>
      <input
        type="file"
        ref={inputRef}
        hidden
        onChange={handleImages}
        multiple
        accept="image/png,image/jpg,image/jpeg,image/webp"
      />
      <button
        type="button"
        className="mt-2 bg-blue-500 py-2.5 px-5 rounded text-white font-semibold"
        style={{ width: '150px' }}
        onClick={() => inputRef.current.click()}
      >
        Add images
      </button>
      {error && <div className="my-2 text-red-700">{error}</div>}
      <div className="grid grid-cols-3 gap-2 mt-2">
        {images.length > 0
          && images.map((img, i) => (
            <span key={i}>
              <RiDeleteBin6Line className="text-gray-500 cursor-pointer w-6 h-6" onClick={() => removeImage(img)} />
              <img className="h-auto max-w-full rounded-lg" src={img} alt="" />
            </span>
          ))}
      </div>
    </div>
  );
};

export default Images;
