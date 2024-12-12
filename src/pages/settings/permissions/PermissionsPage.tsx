import React, { useState } from 'react';
import { Plus, Shield } from 'lucide-react';
import Button from '../../../components/common/Button';
import Table from '../../../components/common/Table';

const INITIAL_ROLES = [
  {
    id: 1,
    name: 'Administrator',
    description: 'Full system access',
    permissions: {
      users: 4,
      batches: 4,
      deliveries: 4,
      facilities: 4
    }
  },
  {
    id: 2,
    name: 'Manager',
    description: 'Manage operations',
    permissions: {
      users: 2,
      batches: 3,
      deliveries: 3,
      facilities: 2
    }
  },
  {
    id: 3,
    name: 'User',
    description: 'Basic access',
    permissions: {
      batches: 2,
      deliveries: 2,
      facilities: 1
    }
  }
];

const RESOURCES = [
  { id: 'users', name: 'Users', description: 'User management' },
  { id: 'batches', name: 'Batches', description: 'Supply batches' },
  { id: 'deliveries', name: 'Deliveries', description: 'Delivery management' },
  { id: 'facilities', name: 'Facilities', description: 'Facility management' }
];

const PERMISSIONS = [
  { value: 0, label: 'No Access' },
  { value: 1, label: 'View' },
  { value: 2, label: 'Read' },
  { value: 3, label: 'Update' },
  { value: 4, label: 'Delete' }
];

const PermissionsPage = () => {
  const [roles, setRoles] = useState(INITIAL_ROLES);
  const [selectedRole, setSelectedRole] = useState(INITIAL_ROLES[0]);

  const handlePermissionChange = (resourceId: string, value: number) => {
    if (!selectedRole) return;

    setRoles(currentRoles => {
      return currentRoles.map(role => {
        if (role.id === selectedRole.id) {
          return {
            ...role,
            permissions: {
              ...role.permissions,
              [resourceId]: value
            }
          };
        }
        return role;
      });
    });
  };

  const columns = [
    {
      key: 'name',
      header: 'Role Name',
      render: (value: string, role: any) => (
        <div 
          className={`flex items-center cursor-pointer ${selectedRole?.id === role.id ? 'text-blue-600' : ''}`}
          onClick={() => setSelectedRole(role)}
        >
          <Shield className="w-4 h-4 text-gray-400 mr-2" />
          <div>
            <div className="font-medium">{value}</div>
          </div>
        </div>
      )
    },
    { key: 'description', header: 'Description' },
    {
      key: 'permissions',
      header: 'Access Level',
      render: (_, role) => (
        <div className="flex flex-wrap gap-1">
          {Object.entries(role.permissions).map(([resource, level]) => (
            <span
              key={resource}
              className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700"
            >
              {`${resource}: ${PERMISSIONS.find(p => p.value === level)?.label}`}
            </span>
          ))}
        </div>
      )
    }
  ];

  const getPermissionDescription = (value: number) => {
    switch (value) {
      case 1: return 'Can view basic information';
      case 2: return 'Can view and read detailed information';
      case 3: return 'Can view, read, and make changes';
      case 4: return 'Full access including deletion';
      default: return 'No access to this resource';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Roles & Permissions</h1>
          <p className="text-gray-600 mt-1">Manage user roles and their access permissions</p>
        </div>
        <Button icon={Plus}>Create Role</Button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Roles List */}
        <div className="col-span-12 xl:col-span-4">
          <div className="bg-white rounded-lg shadow">
            <Table
              columns={columns}
              data={roles}
              onRowClick={setSelectedRole}
            />
          </div>
        </div>

        {/* Permissions Matrix */}
        <div className="col-span-12 xl:col-span-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-medium">Permission Matrix</h2>
                <p className="text-sm text-gray-500 mt-1">
                  {selectedRole 
                    ? `Configuring permissions for ${selectedRole.name}`
                    : 'Select a role to configure permissions'}
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Resource
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Permission Level
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {RESOURCES.map(resource => (
                    <tr key={resource.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{resource.name}</div>
                        <div className="text-sm text-gray-500">{resource.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={selectedRole?.permissions[resource.id] || 0}
                          onChange={(e) => handlePermissionChange(resource.id, Number(e.target.value))}
                          className="form-select w-full"
                          disabled={!selectedRole}
                        >
                          {PERMISSIONS.map(permission => (
                            <option key={permission.value} value={permission.value}>
                              {permission.label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600">
                          {getPermissionDescription(selectedRole?.permissions[resource.id] || 0)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermissionsPage;