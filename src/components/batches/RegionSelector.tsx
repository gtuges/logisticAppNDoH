import React from 'react';
import { MapPin } from 'lucide-react';
import { RegionName } from '../../types';

interface RegionSelectorProps {
  selectedRegion: RegionName | null;
  onRegionSelect: (region: RegionName) => void;
}

const RegionSelector: React.FC<RegionSelectorProps> = ({ selectedRegion, onRegionSelect }) => {
  return (
    <div className="bg-white rounded-lg shadow mb-6">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Region Selection</h2>
        <p className="text-sm text-gray-600">Select a region to view logistics providers</p>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-2 gap-3">
          {(['Highlands', 'Momase', 'Southern', 'New Guinea Islands'] as RegionName[]).map((region) => (
            <button
              key={region}
              className={`
                flex items-center justify-center space-x-2 px-4 py-3 rounded-lg border-2 
                transition-all w-full
                ${selectedRegion === region
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-blue-200 text-gray-700'
                }
              `}
              onClick={() => onRegionSelect(region)}
            >
              <MapPin className="w-4 h-4" />
              <span className="font-medium">{region}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegionSelector;