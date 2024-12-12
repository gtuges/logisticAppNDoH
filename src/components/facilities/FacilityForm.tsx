import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Search, X } from 'lucide-react';
import Button from '../common/Button';
import FormField from '../common/FormField';
import { 
  Facility,
  regions,
  facilityTypes,
  provinces,
  districts
} from '../../types/facilities';

interface FacilityFormProps {
  facility?: Facility | null;
  onSubmit: (data: Omit<Facility, 'id'>) => void;
  onCancel: () => void;
}

const FacilityForm: React.FC<FacilityFormProps> = ({ facility, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    description: facility?.description || '',
    facilityTypeId: facility?.facilityTypeId || 0,
    provinceId: facility?.provinceId || 0,
    districtId: facility?.districtId || 0,
    regionId: facility?.regionId || 0,
    geoCoordinates: facility?.geoCoordinates || { latitude: 0, longitude: 0 }
  });

  // Search states
  const [provinceSearch, setProvinceSearch] = useState('');
  const [districtSearch, setDistrictSearch] = useState('');
  const [showProvinceDropdown, setShowProvinceDropdown] = useState(false);
  const [showDistrictDropdown, setShowDistrictDropdown] = useState(false);

  // Selected item states
  const [selectedProvince, setSelectedProvince] = useState<typeof provinces[0] | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<typeof districts[0] | null>(null);

  // Refs for click outside handling
  const provinceDropdownRef = useRef<HTMLDivElement>(null);
  const districtDropdownRef = useRef<HTMLDivElement>(null);

  // Set initial values if editing
  useEffect(() => {
    if (facility) {
      const province = provinces.find(p => p.id === facility.provinceId);
      const district = districts.find(d => d.id === facility.districtId);
      
      if (province) {
        setSelectedProvince(province);
        setProvinceSearch(province.name);
      }
      
      if (district) {
        setSelectedDistrict(district);
        setDistrictSearch(district.name);
      }
    }
  }, [facility]);

  // Handle click outside dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (provinceDropdownRef.current && !provinceDropdownRef.current.contains(event.target as Node)) {
        setShowProvinceDropdown(false);
      }
      if (districtDropdownRef.current && !districtDropdownRef.current.contains(event.target as Node)) {
        setShowDistrictDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter provinces based on search and selected region
  const filteredProvinces = provinces.filter(province => 
    province.regionId === formData.regionId &&
    province.name.toLowerCase().includes(provinceSearch.toLowerCase())
  );

  // Filter districts based on search and selected province
  const filteredDistricts = districts.filter(district => 
    district.provinceId === formData.provinceId &&
    district.name.toLowerCase().includes(districtSearch.toLowerCase())
  );

  const handleProvinceSelect = (province: typeof provinces[0]) => {
    setFormData(prev => ({ 
      ...prev, 
      provinceId: province.id,
      districtId: 0 // Reset district when province changes
    }));
    setSelectedProvince(province);
    setProvinceSearch(province.name);
    setShowProvinceDropdown(false);
    
    // Reset district selection
    setSelectedDistrict(null);
    setDistrictSearch('');
  };

  const handleDistrictSelect = (district: typeof districts[0]) => {
    setFormData(prev => ({ ...prev, districtId: district.id }));
    setSelectedDistrict(district);
    setDistrictSearch(district.name);
    setShowDistrictDropdown(false);
  };

  const clearProvince = () => {
    setFormData(prev => ({ 
      ...prev, 
      provinceId: 0,
      districtId: 0 
    }));
    setSelectedProvince(null);
    setProvinceSearch('');
    setSelectedDistrict(null);
    setDistrictSearch('');
  };

  const clearDistrict = () => {
    setFormData(prev => ({ ...prev, districtId: 0 }));
    setSelectedDistrict(null);
    setDistrictSearch('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormField label="Facility Description" required>
        <input
          type="text"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="form-input"
          required
          maxLength={100}
        />
      </FormField>

      <FormField label="Facility Type" required>
        <select
          value={formData.facilityTypeId}
          onChange={(e) => setFormData({ ...formData, facilityTypeId: Number(e.target.value) })}
          className="form-select"
          required
        >
          <option value="">Select Facility Type</option>
          {facilityTypes.map(type => (
            <option key={type.id} value={type.id}>
              {type.name} - {type.description}
            </option>
          ))}
        </select>
      </FormField>

      <FormField label="Region" required>
        <select
          value={formData.regionId}
          onChange={(e) => {
            const regionId = Number(e.target.value);
            setFormData({ 
              ...formData, 
              regionId,
              provinceId: 0,
              districtId: 0 
            });
            setSelectedProvince(null);
            setProvinceSearch('');
            setSelectedDistrict(null);
            setDistrictSearch('');
          }}
          className="form-select"
          required
        >
          <option value="">Select Region</option>
          {regions.map(region => (
            <option key={region.id} value={region.id}>
              {region.name} - {region.description}
            </option>
          ))}
        </select>
      </FormField>

      <div className="grid grid-cols-2 gap-6">
        {/* Province Search */}
        <div className="relative" ref={provinceDropdownRef}>
          <FormField label="Province" required>
            <div className="relative">
              <input
                type="text"
                value={provinceSearch}
                onChange={(e) => {
                  setProvinceSearch(e.target.value);
                  setShowProvinceDropdown(true);
                  setSelectedProvince(null);
                }}
                onFocus={() => setShowProvinceDropdown(true)}
                className={`form-input ${!selectedProvince ? 'pl-10' : 'pl-4'}`}
                placeholder="Search provinces..."
                required
                disabled={!formData.regionId}
              />
              {!selectedProvince && (
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              )}
              {selectedProvince && (
                <button
                  type="button"
                  onClick={clearProvince}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </FormField>

          {showProvinceDropdown && !selectedProvince && filteredProvinces.length > 0 && (
            <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto border border-gray-200">
              {filteredProvinces.map((province) => (
                <button
                  key={province.id}
                  type="button"
                  onClick={() => handleProvinceSelect(province)}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50 focus:bg-blue-50 focus:outline-none"
                >
                  {province.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* District Search */}
        <div className="relative" ref={districtDropdownRef}>
          <FormField label="District" required>
            <div className="relative">
              <input
                type="text"
                value={districtSearch}
                onChange={(e) => {
                  setDistrictSearch(e.target.value);
                  setShowDistrictDropdown(true);
                  setSelectedDistrict(null);
                }}
                onFocus={() => setShowDistrictDropdown(true)}
                className={`form-input ${!selectedDistrict ? 'pl-10' : 'pl-4'}`}
                placeholder="Search districts..."
                required
                disabled={!formData.provinceId}
              />
              {!selectedDistrict && (
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              )}
              {selectedDistrict && (
                <button
                  type="button"
                  onClick={clearDistrict}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </FormField>

          {showDistrictDropdown && !selectedDistrict && filteredDistricts.length > 0 && (
            <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg max-h-60 overflow-auto border border-gray-200">
              {filteredDistricts.map((district) => (
                <button
                  key={district.id}
                  type="button"
                  onClick={() => handleDistrictSelect(district)}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50 focus:bg-blue-50 focus:outline-none"
                >
                  {district.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <FormField label="Geo Coordinates" icon={MapPin}>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            step="any"
            placeholder="Latitude"
            value={formData.geoCoordinates.latitude}
            onChange={(e) => setFormData({
              ...formData,
              geoCoordinates: {
                ...formData.geoCoordinates,
                latitude: Number(e.target.value)
              }
            })}
            className="form-input"
            required
          />
          <input
            type="number"
            step="any"
            placeholder="Longitude"
            value={formData.geoCoordinates.longitude}
            onChange={(e) => setFormData({
              ...formData,
              geoCoordinates: {
                ...formData.geoCoordinates,
                longitude: Number(e.target.value)
              }
            })}
            className="form-input"
            required
          />
        </div>
      </FormField>

      <div className="flex justify-end space-x-3 pt-6 border-t">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {facility ? 'Update' : 'Create'} Facility
        </Button>
      </div>
    </form>
  );
};

export default FacilityForm;