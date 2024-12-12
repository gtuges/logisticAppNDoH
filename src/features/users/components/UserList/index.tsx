import React from 'react';
import { User, Shield } from 'lucide-react';
import Table from '../../../../components/common/Table';
import Pagination from '../../../../components/common/Pagination';
import { User as UserType } from '../../types';
import { UserListProps } from './types';
import { columns } from './columns';

const UserList: React.FC<UserListProps> = ({ 
  users, 
  currentPage, 
  totalPages, 
  onPageChange,
  onEdit, 
  onDelete 
}) => {
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow">
        <Table
          columns={columns}
          data={users}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>

      {totalPages > 1 && (
        <div className="flex justify-end">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
};

export default UserList;