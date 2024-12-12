import React from 'react';
import { Shield, Users } from 'lucide-react';
import Table from '../../../../components/common/Table';
import { Role } from '../../../../types/permission';
import { getPermissionLabel } from '../utils';

interface RoleListProps {
  roles: Role[];
  onEdit: (role: Role) => void;
  onDelete: (role: Role) => void;
}

const RoleList: React.FC<RoleListProps> = ({ roles, onEdit, onDelete }) => {
  const columns = [
    {
      key: 'name',
      header: 'Role Name',
      render: (value: string) => (
        <div className="flex items-center">
          <Shield className="w-4 h-4 text-gray-400 mr-2" />
          <span className="font-medium">{value}</span>
        </div>
      )
    },
    { key: 'description', header: 'Description' },
    {
      key: 'permissions',
      header: 'Permissions',
      render: (permissions: number[]) => (
        <div className="flex flex-wrap gap-1">
          {permissions.map(permId => (
            <span
              key={permId}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700"
            >
              {getPermissionLabel(permId)}
            </span>
          ))}
        </div>
      )
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      <Table
        columns={columns}
        data={roles}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );
};