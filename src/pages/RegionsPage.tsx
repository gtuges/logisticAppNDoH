import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import Table from '../components/common/Table';
import Button from '../components/common/Button';
import Modal from '../components/common/Modal';
import { Region } from '../types';

const initialRegions: Region[] = [
  {
    id: '1',
    name: 'Highlands',
    facilities: 45,
    population: 2800000,
    activeDeliveries: 12
  },
  {
    id: '2',
    name: 'Momase',
    facilities: 38,
    population: 1900000,
    activeDeliveries: 8
  },
  {
    id: '3',
    name: 'Southern',
    facilities: 42,
    population: 2100000,
    activeDeliveries: 15
  },
  {
    id: '4',
    name: 'New Guinea Islands',
    facilities: 31,
    population: 1200000,
    activeDeliveries: 6
  }
];

const RegionsPage = () => {
  const [regions, setRegions] = useState<Region[]>(initialRegions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);

  const columns = [
    { key: 'name', header: 'Name' },
    { 
      key: 'facilities', 
      header: 'Facilities',
      render: (value: number) => (
        <span className="font-medium text-blue-600">{value}</span>
      )
    },
    { 
      key: 'population', 
      header: 'Population',
      render: (value: number) => value.toLocaleString()
    },
    { 
      key: 'activeDeliveries', 
      header: 'Active Deliveries',
      render: (value: number) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
          {value} active
        </span>
      )
    }
  ];

  const handleEdit = (region: Region) => {
    setSelectedRegion(region);
    setIsModalOpen(true);
  };

  const handleDelete = (region: Region) => {
    setRegions(regions.filter(r => r.id !== region.id));
  };

  const handleAdd = () => {
    setSelectedRegion(null);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Regions</h1>
        <Button icon={Plus} onClick={handleAdd}>Add Region</Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table
          columns={columns}
          data={regions}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedRegion ? 'Edit Region' : 'Add Region'}
      >
        <RegionForm
          region={selectedRegion}
          onSubmit={(data) => {
            if (selectedRegion) {
              setRegions(regions.map(r => 
                r.id === selectedRegion.id ? { ...data, id: r.id } : r
              ));
            } else {
              setRegions([...regions, { ...data, id: String(Date.now()) }]);
            }
            setIsModalOpen(false);
          }}
        />
      </Modal>
    </div>
  );
};

interface RegionFormProps {
  region?: Region | null;
  onSubmit: (data: Omit<Region, 'id'>) => void;
}

const RegionForm: React.FC<RegionFormProps> = ({ region, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: region?.name || '',
    facilities: region?.facilities || 0,
    population: region?.population || 0,
    activeDeliveries: region?.activeDeliveries || 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Facilities</label>
          <input
            type="number"
            value={formData.facilities}
            onChange={(e) => setFormData({ ...formData, facilities: parseInt(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
            min="0"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Population</label>
          <input
            type="number"
            value={formData.population}
            onChange={(e) => setFormData({ ...formData, population: parseInt(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
            min="0"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Active Deliveries</label>
        <input
          type="number"
          value={formData.activeDeliveries}
          onChange={(e) => setFormData({ ...formData, activeDeliveries: parseInt(e.target.value) })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
          min="0"
        />
      </div>

      <div className="flex justify-end space-x-3">
        <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
          Cancel
        </Button>
        <Button type="submit">
          {region ? 'Update' : 'Create'} Region
        </Button>
      </div>
    </form>
  );
};

export default RegionsPage;