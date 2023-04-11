import React, { useState, useEffect } from 'react';
import { Rating } from '@mui/material';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

import { hideDialog, showDialog } from '../../store/DialogSlice';
import DialogModal from '../dialogModal';
import dataURItoBlob from '../../utils/dataURItoBlob';
import { uploadCarImages } from '../../requests/upload';
import Images from './Images';

const AddReview = ({ car, setReviews }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(hideDialog());
  }, []);

  const [review, setReview] = useState('');
  const [rating, setRating] = useState();
  const [images, setImages] = useState([]);
  let uploaded = [];

  const handleSubmit = async () => {
    setLoading(true);
    const msgs = [];

    if (!review) {
      msgs.push({
        msg: 'Please add a review !',
        type: 'error',
      });
    }
    if (!rating) {
      msgs.push({
        msg: 'Please select a rating !',
        type: 'error',
      });
    }
    if (msgs.length > 0) {
      dispatch(
        showDialog({
          header: 'Adding review error !',
          msgs,
        }),
      );
    } else {
      if (images.length > 0) {
        const temp = images.map((img) => dataURItoBlob(img));
        const path = 'reviews images';
        const formData = new FormData();
        formData.append('path', path);
        temp.forEach((img) => {
          formData.append('file', img);
        });
        uploaded = await uploadCarImages(formData);
      }
      console.log('data', {
        rating,
        review,
        images: uploaded,
      });
      const { data } = await axios.put(`/api/car/${car._id}/review`, {
        rating,
        review,
        images: uploaded,
      });
      setReviews(data.reviews);
      setImages([]);
      setRating(0);
      setReview('');
    }
    setLoading(false);
  };

  return (
    <div className="m-4">
      <DialogModal />
      <Images images={images} setImages={setImages} />
      <textarea
        id="message"
        rows="4"
        className="block my-4 p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300" placeholder="Write your review here..."
        onChange={(e) => setReview(e.target.value)}
      />
      <Rating
        defaultValue={0}
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        precision={0.5}
      />
      <button
        type="button"
        className="mt-4 mx-auto w-full bg-blue-500 py-2.5 px-5 rounded text-white font-semibold"
        onClick={() => handleSubmit()}
      >
        Submit Review
        {loading && <ClipLoader loading={loading} color="#fff" />}
      </button>
    </div>
  );
};

export default AddReview;
