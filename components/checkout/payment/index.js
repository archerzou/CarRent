import { Elements, CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Form from './Form';

const Payment = () => {
  const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);

  return (
    <Elements stripe={stripePromise}>
      <Form />
    </Elements>
  );
};

export default Payment;
