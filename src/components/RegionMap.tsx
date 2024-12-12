import React from 'react';

const RegionMap = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Regional Distribution</h2>
      <div className="aspect-video bg-gray-50 rounded-lg flex items-center justify-center">
        <img 
          src="https://images.unsplash.com/photo-1569396116180-210c182bedb8?auto=format&fit=crop&q=80&w=1000" 
          alt="Papua New Guinea Map" 
          className="w-full h-full object-cover rounded-lg opacity-80"
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {['Highlands', 'Momase', 'Southern', 'New Guinea Islands'].map((region) => (
          <div key={region} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="font-medium">{region}</span>
            <span className="text-blue-600 font-semibold">
              {Math.floor(Math.random() * 50 + 10)} facilities
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegionMap;