import React, { useState } from 'react';
import { Plus, Building2, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import Table from '../components/common/Table';
import FacilityForm from '../components/facilities/FacilityForm';
import { Facility, initialFacilities, regions, facilityTypes } from '../types/facilities';

const FacilitiesPage = () => {
  const [facilities, setFacilities] = useState<Facility[]>(initialFacilities);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);

  const columns = [
    { 
      key: 'description',
      header: 'Facility',
      render: (value: string) => (
        <div className="flex items-center">
          <Building2 className="w-4 h-4 text-gray-400 mr-2" />
          <span className="font-medium">{value}</span>
        </div>
      )
    },
    { 
      key: 'facilityTypeId',
      header: 'Type',
      render: (value: number) => {
        const type = facilityTypes.find(t => t.id === value);
        return type?.name || 'Unknown';
      }
    },
    { 
      key: 'regionId',
      header: 'Region',
      render: (value: number) => {
        const region = regions.find(r => r.id === value);
        return region?.name || 'Unknown';
      }
    },
    {
      key: 'geoCoordinates',
      header: 'Location',
      render: (value: { latitude: number; longitude: number }) => (
        <div className="flex items-center">
          <MapPin className="w-4 h-4 text-gray-400 mr-2" />
          <span>
            {value.latitude.toFixed(3)}, {value.longitude.toFixed(3)}
          </span>
        </div>
      )
    }
  ];

  const handleAdd = () => {
    setSelectedFacility(null);
    setIsModalOpen(true);
  };

  const handleEdit = (facility: Facility) => {
    setSelectedFacility(facility);
    setIsModalOpen(true);
  };

  const handleSubmit = (data: Omit<Facility, 'id'>) => {
    if (selectedFacility) {
      setFacilities(facilities.map(f => 
        f.id === selectedFacility.id ? { ...data, id: selectedFacility.id } : f
      ));
      toast.success('Facility updated successfully');
    } else {
      const newId = Math.max(...facilities.map(f => f.id)) + 1;
      setFacilities([...facilities, { ...data, id: newId }]);
      toast.success('Facility created successfully');
    }
    setIsModalOpen(false);
  };

  const handleDelete = (facility: Facility) => {
    if (window.confirm('Are you sure you want to delete this facility?')) {
      setFacilities(facilities.filter(f => f.id !== facility.id));
      toast.success('Facility deleted successfully');
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Facilities</h1>
          <p className="text-gray-600 mt-1">Manage healthcare facilities across regions</p>
        </div>
        <Button icon={Plus} onClick={handleAdd}>Add Facility</Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table
          columns={columns}
          data={facilities}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedFacility ? 'Edit Facility' : 'Add Facility'}
        size="xl"
      >
        <FacilityForm
          facility={selectedFacility}
          onSubmit={handleSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default FacilitiesPage;