import { ErrorMessage, useField } from 'formik';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { showDialog } from '../../store/DialogSlice';
import DialogModal from '../dialogModal';

const CustomUpload = ({
  images,
  setImages,
  header,
  text,
  ...props
}) => {
  const dispatch = useDispatch();
  const fileInput = useRef(null);
  const [meta, field] = useField(props);

  const handleImages = (e) => {
    let files = Array.from(e.target.files);
    console.log('images', images);
    files.forEach((img) => {
      if (images.length === 6) {
        dispatch(
          showDialog({
            header: 'Maximu 6 images are allowed.',
            msgs: [
              {
                msg: 'Maximum of total six images are allowed.',
                type: 'error',
              },
            ],
          }),
        );
        return;
      }
      if (
        img.type !== 'image/jpeg'
        && img.type !== 'image/png'
        && img.type !== 'image/jpg'
      ) {
        dispatch(
          showDialog({
            header: 'Unsupported Format.',
            msgs: [
              {
                msg: `${img.name} format is unsupported ! only JPEG,PNG,JPG are allowed.`,
                type: 'error',
              },
            ],
          }),
        );
        console.log('debug', header);
        files = files.filter((item) => item !== img.name);
      } else if (img.size > 1024 * 1024 * 10) {
        dispatch(
          showDialog({
            header: 'Unsopported Format.',
            msgs: [
              {
                msg: `${img.name} size is too large, maximum of 10mb allowed.`,
                type: 'error',
              },
            ],
          }),
        );
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = (e) => {
          setImages((images) => [...images, e.target.result]);
        };
      }
    });
  };

  const handleRemove = (image) => {
    setImages((images) => images.filter((item) => item !== image));
  };

  return (
    <div>
      <div
        className={` ${meta.error ? 'text-red-600' : ''}`}
      >
        <div className="block my-4 text-sm font-medium text-gray-900">
          {meta.error && <img src="/warning.png" alt="" />}
          {header}
        </div>
        <span>
          {meta.touched && meta.error && (
            <div className="text-red-500">
              <ErrorMessage name={field.name} />
            </div>
          )}
        </span>
      </div>
      <input
        type="file"
        name={field.name}
        ref={fileInput}
        hidden
        multiple
        accept="image/jpeg,image/png,image/jpg,image/webp"
        onChange={handleImages}
      />
      <div className="flex flex-col items-center justify-center w-full h-72 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 py-4">
        <div
          className={`grid justify-center items-center pt-5 pb-6 ${
            images.length === 2
              ? 'grid-cols-2'
              : images.length === 3
                ? 'grid-cols-3'
                : images.length === 4
                  ? 'grid-cols-4'
                  : images.length === 5
                    ? 'grid-cols-5'
                    : images.length === 6
                      ? 'grid-cols-6'
                      : ''
          }`}
        >
          {!images.length ? (
            <div className="flex-col justify-center items-center">
              <img
                className="w-32 h-32 mx-auto"
                src="/no-pictures.png"
                alt=""
              />
              <p className="text-xs text-gray-500">JPEG, PNG, JPG or WEBP (MAX. 10MB)</p>
            </div>

          ) : (
            images.map((img, i) => (
              <div className="grid gap-2 flex-wrap p-2 items-end" key={i}>
                <div className="flex-col">
                  <img className="block h-full w-full rounded-lg object-cover object-center" src={img} alt="" />
                  <button type="button" onClick={() => handleRemove(img)}>
                    <RiDeleteBin6Line />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
      <button
        type="button"
        disabled={images.length === 6}
        onClick={() => fileInput.current.click()}
        className="bg-blue-500 text-white py-2.5 px-5 my-4 rounded-lg"
      >
        {text}
      </button>
    </div>

  );
};

export default CustomUpload;
