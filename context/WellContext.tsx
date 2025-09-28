import React, { createContext, useState, ReactNode } from 'react';

// Lightweight types for the context. These can be refined later if you want stricter typing.
type Well = any;
type ChartData = any;

interface WellContextType {
  selectedWell: Well | null;
  setSelectedWell: (w: Well | null) => void;
  chartData: ChartData | null;
  setChartData: (d: ChartData | null) => void;
}

const defaultValue: WellContextType = {
  selectedWell: null,
  setSelectedWell: () => {},
  chartData: null,
  setChartData: () => {},
};

export const WellContext = createContext<WellContextType>(defaultValue);

export const WellProvider = ({ children }: { children: ReactNode }) => {
  const [selectedWell, setSelectedWell] = useState<Well | null>(null);
  const [chartData, setChartData] = useState<ChartData | null>(null);

  return (
    <WellContext.Provider value={{ selectedWell, setSelectedWell, chartData, setChartData }}>
      {children}
    </WellContext.Provider>
  );
};
