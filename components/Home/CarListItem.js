import Image from 'next/image';
import React from 'react';
import { HiUser } from "react-icons/hi";  // Import the HiUser icon

function CarListItem({ car, distance }) {  // Destructure car and distance from props
  return (
    <div>
      <div className='flex items-center justify-between mt-5'>
        <div className='flex items-center gap-5'>
          {/* Example: Accessing car property */}
          <Image 
            src={car.image} 
            alt={car.name} 
            width={100} 
            height={100} 
          />
          <div>
            <h2 className='font-bold text-[18px] flex gap-3 items-center'>
              {car.name}
              <span className='flex items-center'>
                <HiUser /> {car.seat} 
              </span>
            </h2>
            <p>{car.desc}</p>
          </div>
        </div>
        <h2 className='text-[21px] font-bold'>
          ${((car.amount * (distance || 1)).toFixed(2))} {/* Fallback to 1 if distance is undefined */}
        </h2>
      </div>
    </div>
  );
}

export default CarListItem;
