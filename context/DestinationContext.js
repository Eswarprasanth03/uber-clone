import React, { createContext, useState } from "react";

// Create the DestinationContext
export const DestinationContext = createContext();

// Define and export a Provider component
export const DestinationProvider = ({ children }) => {
  const [destination, setDestination] = useState(null);

  return (
    <DestinationContext.Provider value={{ destination, setDestination }}>
      {children}
    </DestinationContext.Provider>
  );
};
