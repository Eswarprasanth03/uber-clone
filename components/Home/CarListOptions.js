import React, { useState } from 'react';
import { CarListData } from '../../utils/CarListData';
import CarListItem from './CarListItem';

function PaymentSuccess() {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h2 className='text-2xl font-bold text-green-600'>Payment Successful!</h2>
      <p className='text-lg mt-2'>Your payment has been processed successfully.</p>
      <button
        className='mt-5 p-3 bg-black text-white rounded-lg'
        onClick={() => window.location.reload()}  // Reload the page to go back
      >
        Go Back
      </button>
    </div>
  );
}

function CarListOptions({ distance }) {
  const [activeIndex, setActiveIndex] = useState();
  const [selectedCar, setSelectedCar] = useState([]);
  const [paymentSuccess, setPaymentSuccess] = useState(false);  // Track if payment is successful

  const handleRequestCar = () => {
    setPaymentSuccess(true);  // Set the payment to success when button is clicked
  };

  // If payment is successful, show the PaymentSuccess component
  if (paymentSuccess) {
    return <PaymentSuccess />;
  }

  return (
    <div className='mt-5 p-5 overflow-auto h-[250px]'>
      <h2 className='text-[22px] font-bold'>Recommended</h2>
      {CarListData.map((item, index) => (
        <div
          key={item.id} // Add a key to each list item
          className={`cursor-pointer p-2 px-4 rounded-md border-black
          ${activeIndex === index ? 'border-[3px]' : ''}`}
          onClick={() => {
            setActiveIndex(index);
            setSelectedCar(item);
          }}
        >
          {/* Pass the distance prop to CarListItem */}
          <CarListItem car={item} distance={distance} />
        </div>
      ))}

      {selectedCar.name ? (
        <div className='flex justify-between fixed bottom-5 bg-white p-3 shadow-xl w-full md:w-[30%] border-[1px] items-center rounded-lg'>
          <h2>Make Payment for</h2>
          <button
            className='p-3 bg-black text-white rounded-lg text-center'
            onClick={handleRequestCar}  // Call the handleRequestCar function when clicked
          >
            Request {selectedCar.name}
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default CarListOptions;
