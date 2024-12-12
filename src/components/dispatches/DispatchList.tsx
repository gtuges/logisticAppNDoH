import React from 'react';
import { Send, Package, Building2 } from 'lucide-react';
import Button from '../common/Button';
import Table from '../common/Table';
import Pagination from '../common/Pagination';
import { Dispatch } from '../../types';
import { initialFacilities } from '../../types/facilities';

interface DispatchListProps {
  dispatches: Dispatch[];
  onEdit: (dispatch: Dispatch) => void;
  onDelete: (dispatch: Dispatch) => void;
  onSelect: (dispatch: Dispatch) => void;
  selectedDispatchId?: string;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const DispatchList: React.FC<DispatchListProps> = ({
  dispatches,
  onEdit,
  onDelete,
  onSelect,
  selectedDispatchId,
  currentPage,
  onPageChange
}) => {
  const itemsPerPage = 5;
  const totalPages = Math.ceil(dispatches.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDispatches = dispatches.slice(startIndex, endIndex);

  const getFacilityName = (facilityId: number) => {
    const facility = initialFacilities.find(f => f.id === facilityId);
    return facility?.description || 'Unknown Facility';
  };

  const columns = [
    { 
      key: 'dispatchNumber',
      header: 'Dispatch #',
      render: (value: string) => (
        <div className="flex items-center">
          <Send className="w-4 h-4 text-gray-400 mr-2" />
          <span>{value}</span>
        </div>
      )
    },
    { 
      key: 'fromFacilityId',
      header: 'From',
      render: (value: number) => (
        <div className="flex items-center">
          <Building2 className="w-4 h-4 text-gray-400 mr-2" />
          <span>{getFacilityName(value)}</span>
        </div>
      )
    },
    { 
      key: 'toFacilityId',
      header: 'To',
      render: (value: number) => (
        <div className="flex items-center">
          <Building2 className="w-4 h-4 text-gray-400 mr-2" />
          <span>{getFacilityName(value)}</span>
        </div>
      )
    },
    { 
      key: 'dispatchDate',
      header: 'Dispatch Date',
      render: (value: string) => new Date(value).toLocaleDateString()
    },
    { 
      key: 'estimatedArrival',
      header: 'ETA',
      render: (value: string) => new Date(value).toLocaleDateString()
    }
  ];

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto" style={{ maxHeight: '400px' }}>
          <table className="w-full">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                {columns.map((column) => (
                  <th 
                    key={column.key}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {column.header}
                  </th>
                ))}
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {currentDispatches.map((dispatch) => (
                <tr 
                  key={dispatch.id}
                  onClick={() => onSelect(dispatch)}
                  className={`cursor-pointer transition-colors ${
                    selectedDispatchId === dispatch.id 
                      ? 'bg-blue-50 hover:bg-blue-100'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {columns.map((column) => (
                    <td key={column.key} className="px-6 py-4 text-sm text-gray-900">
                      {column.render 
                        ? column.render(dispatch[column.key as keyof Dispatch])
                        : dispatch[column.key as keyof Dispatch]?.toString()}
                    </td>
                  ))}
                  <td className="px-6 py-4 text-right text-sm font-medium space-x-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(dispatch);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(dispatch);
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default DispatchList;