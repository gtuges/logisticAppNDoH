import React from 'react';
import { Check } from 'lucide-react';
import { RolePermission } from '../../../../types/permission';
import { PERMISSIONS, PERMISSION_VALUES } from '../constants';

interface PermissionMatrixProps {
  permissions: RolePermission[];
  onChange: (permissions: RolePermission[]) => void;
}

const PermissionMatrix: React.FC<PermissionMatrixProps> = ({ permissions, onChange }) => {
  const handlePermissionToggle = (permissionId: number, value: number) => {
    const existingIndex = permissions.findIndex(
      p => p.permissionId === permissionId && p.value === value
    );

    if (existingIndex >= 0) {
      onChange(permissions.filter((_, index) => index !== existingIndex));
    } else {
      onChange([...permissions, { permissionId, value, roleId: 0 }]);
    }
  };

  const isPermissionSelected = (permissionId: number, value: number) => {
    return permissions.some(p => p.permissionId === permissionId && p.value === value);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Resource
            </th>
            {PERMISSION_VALUES.map(value => (
              <th key={value.value} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {value.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {PERMISSIONS.map(permission => (
            <tr key={permission.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {permission.name}
                </div>
                <div className="text-sm text-gray-500">
                  {permission.description}
                </div>
              </td>
              {PERMISSION_VALUES.map(value => (
                <td key={value.value} className="px-6 py-4 whitespace-nowrap">
                  <button
                    type="button"
                    onClick={() => handlePermissionToggle(permission.id, value.value)}
                    className={`w-6 h-6 rounded border ${
                      isPermissionSelected(permission.id, value.value)
                        ? 'bg-blue-500 border-blue-500 text-white'
                        : 'border-gray-300 hover:border-blue-500'
                    }`}
                  >
                    {isPermissionSelected(permission.id, value.value) && (
                      <Check className="w-4 h-4 mx-auto" />
                    )}
                  </button>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};