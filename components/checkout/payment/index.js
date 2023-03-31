import { paymentMethods } from '../../../data/paymentMethods';

const Payment = ({ paymentMethod, setPaymentMethod }) => (
  <div>
    <p className="p-4 text-left font-semibold leading-tight tracking-tight text-gray-900 text-xl py-3 ">Payment Method</p>
    <div className="flex-col">
      {paymentMethods.map((pm) => (
        <label
          htmlFor={pm.id}
          key={pm.id}
          className="flex items-center mb-4 gap-2 px-6"
          onClick={() => setPaymentMethod(pm.id)}
        >
          <input
            type="radio"
            name="payment"
            id={pm.id}
            checked={paymentMethod === pm.id}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
          />
          <img className="h-auto w-12 rounded-lg my-4 mx-2" src={`../checkout/${pm.id}.webp`} alt={pm.name} />
          <div className="flex">
            <span>Pay with {pm.name}</span>
          </div>
        </label>
      ))}
    </div>
  </div>
);

export default Payment;
