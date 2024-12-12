import React from 'react';
import { Truck, Package } from 'lucide-react';

interface Delivery {
  id: string;
  facility: string;
  region: string;
  status: 'In Transit' | 'Delivered' | 'Scheduled';
  date: string;
  items: number;
}

const deliveries: Delivery[] = [
  { id: '1', facility: 'Port Moresby General Hospital', region: 'Southern', status: 'In Transit', date: '2024-03-20', items: 245 },
  { id: '2', facility: 'Goroka Base Hospital', region: 'Highlands', status: 'Delivered', date: '2024-03-19', items: 180 },
  { id: '3', facility: 'Lae International Hospital', region: 'Momase', status: 'Scheduled', date: '2024-03-21', items: 320 },
];

const DeliveryTable = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent Deliveries</h2>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Facility</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Region</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {deliveries.map((delivery) => (
              <tr key={delivery.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <Package className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm font-medium text-gray-900">{delivery.facility}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{delivery.region}</td>
                <td className="px-6 py-4">
                  <StatusBadge status={delivery.status} />
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">{delivery.date}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{delivery.items}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }: { status: Delivery['status'] }) => {
  const colors = {
    'In Transit': 'bg-yellow-50 text-yellow-700',
    'Delivered': 'bg-green-50 text-green-700',
    'Scheduled': 'bg-blue-50 text-blue-700',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[status]}`}>
      {status === 'In Transit' && <Truck className="w-3 h-3 mr-1" />}
      {status}
    </span>
  );
};

export default DeliveryTable;