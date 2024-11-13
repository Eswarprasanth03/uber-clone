import React from 'react';
import Link from 'next/link'; // Import Link for navigation

function PaymentSuccess() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full md:w-[400px] text-center">
        <h2 className="text-3xl font-bold text-green-500 mb-4">Payment Successful!</h2>
        <p className="text-lg text-gray-700 mb-6">Thank you for your payment. Your order is being processed.</p>
        <Link href="/">
          <button className="px-6 py-3 bg-black text-white rounded-lg">Go to Home</button>
        </Link>
      </div>
    </div>
  );
}

export default PaymentSuccess;
