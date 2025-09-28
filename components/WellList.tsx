// components/WellList.js
import React, { useContext } from 'react';
import { WellContext } from '../context/WellContext';

const mockWells = [
  { id: 1, name: 'Well A', depth: 5000 },
  { id: 2, name: 'Well AA', depth: 4500 },
  { id: 3, name: 'Well AAA', depth: 5200 },
  { id: 4, name: 'Well B', depth: 4800 },
];

const WellList = () => {
  const { selectedWell, setSelectedWell } = useContext(WellContext);

  return (
    <aside className="w-64 bg-white p-4 border-r overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">Well List</h2>
      <ul>
        {mockWells.map((well) => (
          <li
            key={well.id}
            className={`p-3 rounded-lg cursor-pointer mb-2 ${
              selectedWell?.id === well.id ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'
            }`}
            onClick={() => setSelectedWell(well)}
          >
            <p className="font-semibold">{well.name}</p>
            <p className="text-sm text-gray-600">Depth: {well.depth} ft</p>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default WellList;
