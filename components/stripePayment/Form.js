import { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';

const Form = ({ total, orderId }) => {
  const [error, setError] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const cardOptions = {
    iconStyle: 'solid',
    style: {
      base: {
        // iconColor: "#000",
        // color: "#000",
        // fontSize: "16px",
        fontSmoothing: 'antialiased',
        // ":-webkit-autofill": { color: "#000" },
        // "::placeholder": { color: "#000" },
      },
      invalid: {
        iconColor: '#fd010169',
        color: '#fd010169',
      },
    },
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });
    if (!error) {
      try {
        const { id } = paymentMethod;
        const res = await axios.post(`/api/order/${orderId}/payWithStripe`, {
          amount: total,
          id,
        });
        console.log(res);
        if (res.data.success) {
          window.location.reload(false);
        }
      } catch (error) {
        setError(error);
      }
    } else {
      setError(error.message);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement options={cardOptions} />
        <button
          type="submit"
          className="my-6 p-2.5 block w-full text-white bg-blue-500 font-semibold rounded-lg text-xl text-center"
        >
          PAY
        </button>
        {error && <span className="text-red-500">{error}</span>}
      </form>
    </div>
  );
};

export default Form;
