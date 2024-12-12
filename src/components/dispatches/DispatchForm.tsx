import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import Button from '../common/Button';
import FormField from '../common/FormField';
import { Dispatch } from '../../types';
import { Facility, initialFacilities } from '../../types/facilities';

interface DispatchFormProps {
  dispatch?: Dispatch | null;
  onSubmit: (data: Omit<Dispatch, 'id'>) => void;
  onCancel: () => void;
  batchId?: string;
}

const DispatchForm: React.FC<DispatchFormProps> = ({ 
  dispatch, 
  onSubmit, 
  onCancel, 
  batchId
}) => {
  const [formData, setFormData] = useState({
    batchId: dispatch?.batchId || batchId || '',
    fromFacilityId: dispatch?.fromFacilityId || 0,
    toFacilityId: dispatch?.toFacilityId || 0,
    dispatchDate: dispatch?.dispatchDate || new Date().toISOString().split('T')[0],
    msivNumber: dispatch?.msivNumber || '',
    dispatchNumber: dispatch?.dispatchNumber || '',
    estimatedArrival: dispatch?.estimatedArrival || new Date().toISOString().split('T')[0],
  });

  // Search states
  const [fromSearch, setFromSearch] = useState('');
  const [toSearch, setToSearch] = useState('');
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);

  // Selected facility states
  const [selectedFromFacility, setSelectedFromFacility] = useState<Facility | null>(null);
  const [selectedToFacility, setSelectedToFacility] = useState<Facility | null>(null);

  // Refs for click outside handling
  const fromDropdownRef = useRef<HTMLDivElement>(null);
  const toDropdownRef = useRef<HTMLDivElement>(null);

  // Filter facilities based on search
  const filteredFromFacilities = initialFacilities.filter(facility =>
    facility.description.toLowerCase().includes(fromSearch.toLowerCase())
  );

  const filteredToFacilities = initialFacilities.filter(facility =>
    facility.description.toLowerCase().includes(toSearch.toLowerCase())
  );

  // Handle click outside dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fromDropdownRef.current && !fromDropdownRef.current.contains(event.target as Node)) {
        setShowFromDropdown(false);
      }
      if (toDropdownRef.current && !toDropdownRef.current.contains(event.target as Node)) {
        setShowToDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Set initial facility names if editing
  useEffect(() => {
    if (dispatch) {
      const fromFacility = initialFacilities.find(f => f.id === dispatch.fromFacilityId);
      const toFacility = initialFacilities.find(f => f.id === dispatch.toFacilityId);
      if (fromFacility) {
        setFromSearch(fromFacility.description);
        setSelectedFromFacility(fromFacility);
      }
      if (toFacility) {
        setToSearch(toFacility.description);
        setSelectedToFacility(toFacility);
      }
    }
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleFacilitySelect = (facility: Facility, type: 'from' | 'to') => {
    if (type === 'from') {
      setFormData(prev => ({ ...prev, fromFacilityId: facility.id }));
      setFromSearch(facility.description);
      setSelectedFromFacility(facility);
      setShowFromDropdown(false);
    } else {
      setFormData(prev => ({ ...prev, toFacilityId: facility.id }));
      setToSearch(facility.description);
      setSelectedToFacility(facility);
      setShowToDropdown(false);
    }
  };

  const clearFacility = (type: 'from' | 'to') => {
    if (type === 'from') {
      setFromSearch('');
      setSelectedFromFacility(null);
      setFormData(prev => ({ ...prev, fromFacilityId: 0 }));
    } else {
      setToSearch('');
      setSelectedToFacility(null);
      setFormData(prev => ({ ...prev, toFacilityId: 0 }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input type="hidden" name="batchId" value={formData.batchId} />

      <FormField label="Dispatch Number" required>
        <input
          type="text"
          value={formData.dispatchNumber}
          onChange={(e) => setFormData({ ...formData, dispatchNumber: e.target.value })}
          className="form-input"
          required
          maxLength={100}
        />
      </FormField>

      <FormField label="MSIV Number" required={false}>
        <input
          type="text"
          value={formData.msivNumber}
          onChange={(e) => setFormData({ ...formData, msivNumber: e.target.value })}
          className="form-input"
          maxLength={100}
          placeholder="Enter MSIV number if available"
        />
      </FormField>

      <div className="grid grid-cols-2 gap-6">
        {/* From Facility Search */}
        <div className="relative" ref={fromDropdownRef}>
          <FormField label="From Facility" required>
            <div className="relative">
              <input
                type="text"
                value={fromSearch}
                onChange={(e) => {
                  setFromSearch(e.target.value);
                  setShowFromDropdown(true);
                  setSelectedFromFacility(null);
                }}
                onFocus={() => setShowFromDropdown(true)}
                className={`form-input ${!selectedFromFacility ? 'pl-10' : 'pl-4'}`}
                placeholder="Search facilities..."
                required
              />
              {!selectedFromFacility && (
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              )}
              {selectedFromFacility && (
                <button
                  type="button"
                  onClick={() => clearFacility('from')}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </FormField>
          
          {showFromDropdown && !selectedFromFacility && filteredFromFacilities.length > 0 && (
            <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto border border-gray-200">
              {filteredFromFacilities.map((facility) => (
                <button
                  key={facility.id}
                  type="button"
                  onClick={() => handleFacilitySelect(facility, 'from')}
                  className="w-full text-left px-4 py-3 text-sm hover:bg-blue-50 focus:bg-blue-50 focus:outline-none border-b border-gray-100 last:border-0"
                >
                  <div className="font-medium">{facility.description}</div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    Region: {facility.regionId === 1 ? 'Highlands' : 
                            facility.regionId === 2 ? 'Momase' :
                            facility.regionId === 3 ? 'Southern' : 'New Guinea Islands'}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* To Facility Search */}
        <div className="relative" ref={toDropdownRef}>
          <FormField label="To Facility" required>
            <div className="relative">
              <input
                type="text"
                value={toSearch}
                onChange={(e) => {
                  setToSearch(e.target.value);
                  setShowToDropdown(true);
                  setSelectedToFacility(null);
                }}
                onFocus={() => setShowToDropdown(true)}
                className={`form-input ${!selectedToFacility ? 'pl-10' : 'pl-4'}`}
                placeholder="Search facilities..."
                required
              />
              {!selectedToFacility && (
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              )}
              {selectedToFacility && (
                <button
                  type="button"
                  onClick={() => clearFacility('to')}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </FormField>
          
          {showToDropdown && !selectedToFacility && filteredToFacilities.length > 0 && (
            <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto border border-gray-200">
              {filteredToFacilities.map((facility) => (
                <button
                  key={facility.id}
                  type="button"
                  onClick={() => handleFacilitySelect(facility, 'to')}
                  className="w-full text-left px-4 py-3 text-sm hover:bg-blue-50 focus:bg-blue-50 focus:outline-none border-b border-gray-100 last:border-0"
                >
                  <div className="font-medium">{facility.description}</div>
                  <div className="text-xs text-gray-500 mt-0.5">
                    Region: {facility.regionId === 1 ? 'Highlands' : 
                            facility.regionId === 2 ? 'Momase' :
                            facility.regionId === 3 ? 'Southern' : 'New Guinea Islands'}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <FormField label="Dispatch Date" required>
          <input
            type="date"
            value={formData.dispatchDate}
            onChange={(e) => setFormData({ ...formData, dispatchDate: e.target.value })}
            className="form-input"
            required
          />
        </FormField>

        <FormField label="Estimated Arrival" required>
          <input
            type="date"
            value={formData.estimatedArrival}
            onChange={(e) => setFormData({ ...formData, estimatedArrival: e.target.value })}
            className="form-input"
            required
          />
        </FormField>
      </div>

      <div className="flex justify-end space-x-3 pt-6 border-t">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {dispatch ? 'Update' : 'Create'} Dispatch
        </Button>
      </div>
    </form>
  );
};

export default DispatchForm;