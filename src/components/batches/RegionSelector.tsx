import React from 'react';
import { MapPin } from 'lucide-react';
import { RegionName } from '../../types';

interface LogisticsCompany {
  id: string;
  name: string;
  region: RegionName;
  contact: string;
  description: string;
}

const logisticsCompanies: Record<RegionName, LogisticsCompany> = {
  'Highlands': {
    id: 'HL-LOG',
    name: 'Highlands Logistics Ltd',
    region: 'Highlands',
    contact: '+675 123 4567',
    description: 'Specialized in high-altitude medical supply distribution across the Highlands region.'
  },
  'Momase': {
    id: 'MM-LOG',
    name: 'Momase Transport Services',
    region: 'Momase',
    contact: '+675 234 5678',
    description: 'Expert coastal and inland distribution services for the Momase region.'
  },
  'Southern': {
    id: 'ST-LOG',
    name: 'Southern Region Carriers',
    region: 'Southern',
    contact: '+675 345 6789',
    description: 'Premier logistics provider for Port Moresby and Southern region healthcare facilities.'
  },
  'New Guinea Islands': {
    id: 'NGI-LOG',
    name: 'Islands Freight Solutions',
    region: 'New Guinea Islands',
    contact: '+675 456 7890',
    description: 'Specialized in inter-island medical supply distribution and cold chain management.'
  }
};

interface RegionSelectorProps {
  selectedRegion: RegionName | null;
  onRegionSelect: (region: RegionName) => void;
}

const RegionSelector: React.FC<RegionSelectorProps> = ({ selectedRegion, onRegionSelect }) => {
  const selectedCompany = selectedRegion ? logisticsCompanies[selectedRegion] : null;

  return (
    <div className="bg-white rounded-lg shadow mb-6">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Region Selection</h2>
        <p className="text-sm text-gray-600">Select a region to view its assigned logistics provider</p>
      </div>
      
      <div className="p-4">
        {/* Single Row Region Buttons with Equal Width */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {Object.keys(logisticsCompanies).map((region) => (
            <button
              key={region}
              className={`
                flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg border-2 
                transition-all w-full
                ${selectedRegion === region
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-blue-200 text-gray-700'
                }
              `}
              onClick={() => onRegionSelect(region as RegionName)}
            >
              <MapPin className="w-4 h-4" />
              <span className="font-medium">{region}</span>
            </button>
          ))}
        </div>

        {/* Logistics Company Info */}
        {selectedCompany && (
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-blue-900">{selectedCompany.name}</h3>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                {selectedCompany.region}
              </span>
            </div>
            <p className="text-blue-700 mb-4">{selectedCompany.description}</p>
            <div className="flex items-center text-blue-600">
              <span className="font-medium mr-2">Contact:</span>
              {selectedCompany.contact}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegionSelector;