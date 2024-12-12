import { User, Shield } from 'lucide-react';
import { Column } from '../../../../components/common/Table';
import { User as UserType } from '../../types';

export const columns: Column<UserType>[] = [
  { 
    key: 'name',
    header: 'Name',
    render: (_: any, user: UserType) => (
      <div className="flex items-center">
        <User className="w-4 h-4 text-gray-400 mr-2" />
        <div>
          <div className="font-medium">{`${user.firstName} ${user.lastName}`}</div>
          <div className="text-sm text-gray-500">{user.email}</div>
        </div>
      </div>
    )
  },
  {
    key: 'role',
    header: 'Role',
    render: (value: string) => (
      <div className="flex items-center">
        <Shield className="w-4 h-4 text-gray-400 mr-2" />
        <span>{value}</span>
      </div>
    )
  },
  {
    key: 'status',
    header: 'Status',
    render: (value: string) => (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        value === 'Active' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
      }`}>
        {value}
      </span>
    )
  },
  {
    key: 'createdAt',
    header: 'Created At',
    render: (value: string) => new Date(value).toLocaleDateString()
  }
];