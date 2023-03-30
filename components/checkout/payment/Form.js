import React from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

const Form = () => {
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
  };
  return (
    <div className="mx-6 w-1/3 bg-white rounded-lg shadow my-8 xl:p-0">
      <form onSubmit={handleSubmit}>
        <CardElement options={cardOptions} />
        <button
          type="submit"
          className="w-full mx-auto p-8 text-white bg-blue-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          PAY
        </button>
      </form>
    </div>
  );
};

export default Form;
