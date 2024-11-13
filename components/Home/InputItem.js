"use client";
import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image'; 
import dynamic from 'next/dynamic';
import { SourceContext } from '../../context/SourceContext';
import { DestinationContext } from '../../context/DestinationContext';


const GooglePlacesAutocomplete = dynamic(() => import('react-google-places-autocomplete'), { ssr: false });

const InputItem = ({ type }) => {
  const [value, setValue] = useState(null);
  const [placeholder, setPlaceholder] = useState('');
 const {source,setSource}= useContext(SourceContext)
 const{destination,setDestination}=useContext(DestinationContext)
  // Set placeholder based on type
  useEffect(() => {
    setPlaceholder(type === 'source' ? 'Pickup Location' : 'Dropoff Location');
  }, [type]);

  // Function to get latitude and longitude of the selected place
  const getLatAndLng = (place) => {
    const placeId = place.value.place_id;
    const service = new window.google.maps.places.PlacesService(document.createElement('div'));

    service.getDetails({ placeId }, (place, status) => {
      if(type=='source'){
        setSource({
          lat:place.geometry.location.lat(),
          lng:place.geometry.location.lng(),
          name:place.formatted_address,
          label:place.name
        })
      }else{
        setDestination({
          lat:place.geometry.location.lat(),
          lng:place.geometry.location.lng(),
          name:place.formatted_address,
          label:place.name
        })

      }
    
    });
  };

  return (
    <div className='bg-slate-200 p-3 rounded-lg mt-3 flex items-center gap-1'>
      <Image 
        src={type === 'source' ? '/s.png' : '/destination1.png'} 
        width={15} 
        height={15} 
        alt='Icon' 
      />
      <GooglePlacesAutocomplete
        
        selectProps={{
          value,
          onChange: (place) => {
            getLatAndLng(place);
            setValue(place);
          },
          placeholder: placeholder,
          isClearable: true,
          className: "w-full",
          components: {
            DropdownIndicator: false,
          },
          styles: {
            control: (provided) => ({
              ...provided,
              backgroundColor: "#00ffff00",
              border: 'none',
            }),
          },
        }}
      />
    </div>
  );
};

export default InputItem;
