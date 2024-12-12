import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import Button from './Button';

interface Column<T> {
  key: string;
  header: string;
  render?: (value: any, item: T) => React.ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  actions?: boolean;
}

function Table<T extends { id: string | number }>({ 
  columns, 
  data, 
  onEdit, 
  onDelete,
  actions = true
}: TableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th 
                key={column.key}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
            {actions && (onEdit || onDelete) && (
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              {columns.map((column) => (
                <td key={column.key} className="px-6 py-4 text-sm text-gray-900">
                  {column.render 
                    ? column.render(item[column.key as keyof T], item)
                    : item[column.key as keyof T]?.toString()}
                </td>
              ))}
              {actions && (onEdit || onDelete) && (
                <td className="px-6 py-4 text-right text-sm font-medium space-x-2">
                  {onEdit && (
                    <Button
                      variant="secondary"
                      icon={Edit2}
                      onClick={() => onEdit(item)}
                    >
                      Edit
                    </Button>
                  )}
                  {onDelete && (
                    <Button
                      variant="danger"
                      icon={Trash2}
                      onClick={() => onDelete(item)}
                    >
                      Delete
                    </Button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;