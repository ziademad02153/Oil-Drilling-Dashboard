// components/Dashboard.js
import React, { useState, useContext } from 'react';
import { WellContext } from '../context/WellContext';
import DataVisualization from './DataVisualization';

const Dashboard = () => {
  const { selectedWell, setChartData } = useContext(WellContext);
  const [activeTab, setActiveTab] = useState('Drilling Monitoring');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsLoading(true);
    setMessage('');
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('File uploaded successfully!');
        setChartData(result.data);
      } else {
        throw new Error(result.message || 'File upload failed');
      }
    } catch (error) {
      setMessage(error.message);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="flex border-b">
          <Tab name="Drilling Monitoring" activeTab={activeTab} setActiveTab={setActiveTab} />
          <Tab name="Offset Wells Map" activeTab={activeTab} setActiveTab={setActiveTab} />
          <Tab name="Bit Summary" activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">Filter</button>
          <label className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer">
            {isLoading ? 'Uploading...' : 'Upload'}
            <input type="file" accept=".xlsx" className="hidden" onChange={handleFileUpload} disabled={isLoading} />
          </label>
        </div>
      </div>
      {message && <p className="mb-4 text-center">{message}</p>}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        {activeTab === 'Drilling Monitoring' && (
          <div>
            {!selectedWell ? (
              <p>Please select a well to see the data.</p>
            ) : (
              <DataVisualization />
            )}
          </div>
        )}
        {activeTab !== 'Drilling Monitoring' && <p>This tab is not implemented yet.</p>}
      </div>
    </div>
  );
};

const Tab = ({ name, activeTab, setActiveTab }) => (
  <button
    className={`px-4 py-2 -mb-px ${
      activeTab === name ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'
    }`}
    onClick={() => setActiveTab(name)}
  >
    {name}
  </button>
);

export default Dashboard;
