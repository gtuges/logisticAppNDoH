import React from 'react';
import { Truck, Building2, Map, Package } from 'lucide-react';
import StatsCard from '../components/StatsCard';
import DeliveryTable from '../components/DeliveryTable';
import RegionMap from '../components/RegionMap';

const DashboardPage = () => {
  return (
    <div className="p-4 md:p-6 space-y-6">
      <h1 className="text-xl md:text-2xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatsCard
          title="Total Deliveries"
          value="1,284"
          icon={Truck}
          trend={12}
          color="blue"
        />
        <StatsCard
          title="Active Facilities"
          value="156"
          icon={Building2}
          trend={5}
          color="green"
        />
        <StatsCard
          title="Regions Covered"
          value="4"
          icon={Map}
          color="yellow"
        />
        <StatsCard
          title="Items in Transit"
          value="2,847"
          icon={Package}
          trend={-3}
          color="red"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="order-2 lg:order-1">
          <DeliveryTable />
        </div>
        <div className="order-1 lg:order-2">
          <RegionMap />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;