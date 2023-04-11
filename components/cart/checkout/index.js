import React from 'react';

const Checkout = ({ total, selected, saveCartToDbHandler }) => (
  <div className="mx-auto mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:w-1/3">
    <h1 className="mb-4 text-center text-2xl font-bold">Rental Summary</h1>
    <hr className="my-4" />
    <div className="flex justify-between">
      <p className="text-lg font-bold text-blue-600">Total Fee</p>
      <div className="">
        <p className="mb-1 text-lg font-bold"> USD {total}$</p>
      </div>
    </div>
    <button
      type="button"
      onClick={() => saveCartToDbHandler()}
      className={`${selected.length === 0 ? 'bg-gray-200 cursor-none' : 'bg-blue-600 hover:bg-blue-700'} mt-6 w-full rounded-md py-2.5 font-bold text-blue-50 `}
    >
      Continue
    </button>
    <hr className="my-4" />
    <div className="flex-col items-center justify-start mt-4">
      <h2 className="my-6 text-left text-gray-700 text-lg font-bold">Payment Methods</h2>
      <div className="flex gap-4">
        <img src="/payment/visa.webp" alt="" />
        <img src="/payment/mastercard.webp" alt="" />
        <img src="/payment/paypal.webp" alt="" />
      </div>
    </div>
  </div>
);

export default Checkout;
