
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Form from './Form';

const StripePayment = ({ total, orderId, stripePublicKey }) => {
  const stripePromise = loadStripe(stripePublicKey);
  return (
    <Elements stripe={stripePromise}>
      <Form total={total} order_id={orderId} />
    </Elements>
  );
};

export default StripePayment;
