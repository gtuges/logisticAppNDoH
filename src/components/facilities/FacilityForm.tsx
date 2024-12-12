import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import Button from '../common/Button';
import FormField from '../common/FormField';
import LocationSearch from './search/LocationSearch';
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

  // Selected location states
  const [selectedProvince, setSelectedProvince] = useState(
    facility ? provinces.find(p => p.id === facility.provinceId)?.name || '' : ''
  );
  const [selectedDistrict, setSelectedDistrict] = useState(
    facility ? districts.find(d => d.id === facility.districtId)?.name || '' : ''
  );

  // Filter provinces based on selected region
  const filteredProvinces = provinces
    .filter(province => province.regionId === formData.regionId)
    .map(province => ({
      id: province.id,
      name: province.name,
      description: regions.find(r => r.id === province.regionId)?.name
    }));

  // Filter districts based on selected province
  const filteredDistricts = districts
    .filter(district => district.provinceId === formData.provinceId)
    .map(district => ({
      id: district.id,
      name: district.name,
      description: provinces.find(p => p.id === district.provinceId)?.name
    }));

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
            setSelectedProvince('');
            setSelectedDistrict('');
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
        <LocationSearch
          label="Province"
          value={selectedProvince}
          results={filteredProvinces}
          onSelect={(province) => {
            setFormData(prev => ({ 
              ...prev, 
              provinceId: province.id,
              districtId: 0 
            }));
            setSelectedProvince(province.name);
            setSelectedDistrict('');
          }}
          onClear={() => {
            setFormData(prev => ({ 
              ...prev, 
              provinceId: 0,
              districtId: 0 
            }));
            setSelectedProvince('');
            setSelectedDistrict('');
          }}
          placeholder="Search provinces..."
          disabled={!formData.regionId}
          required
        />

        <LocationSearch
          label="District"
          value={selectedDistrict}
          results={filteredDistricts}
          onSelect={(district) => {
            setFormData(prev => ({ ...prev, districtId: district.id }));
            setSelectedDistrict(district.name);
          }}
          onClear={() => {
            setFormData(prev => ({ ...prev, districtId: 0 }));
            setSelectedDistrict('');
          }}
          placeholder="Search districts..."
          disabled={!formData.provinceId}
          required
        />
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