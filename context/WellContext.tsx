// context/WellContext.js
import React, { createContext, useState } from 'react';

export const WellContext = createContext();

export const WellProvider = ({ children }) => {
  const [selectedWell, setSelectedWell] = useState(null);
  const [chartData, setChartData] = useState(null);

  return (
    <WellContext.Provider value={{ selectedWell, setSelectedWell, chartData, setChartData }}>
      {children}
    </WellContext.Provider>
  );
};
