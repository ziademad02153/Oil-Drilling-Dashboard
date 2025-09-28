// components/DataVisualization.js
import React, { useContext } from 'react';
import { WellContext } from '../context/WellContext';

type Row = { [key: string]: any };

const DataVisualization: React.FC = () => {
  const { chartData } = useContext(WellContext);

  if (!chartData || chartData.length === 0) {
    return <div className="text-center p-10">Upload a file to see the data.</div>;
  }

  const headers = Object.keys(chartData[0]);

  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Uploaded Well Data</h3>
      <div className="overflow-x-auto max-h-[700px]">
        <table className="min-w-full bg-white border">
          <thead className="bg-gray-200 sticky top-0">
            <tr>
              {headers.map((header) => (
                <th key={header} className="py-2 px-4 border-b text-left font-semibold">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {chartData.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-100">
                {headers.map((header) => (
                  <td key={header} className="py-2 px-4 border-b">
                    {row[header]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataVisualization;
