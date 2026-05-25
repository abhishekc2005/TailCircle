import React from 'react';
import StatCard from '../../components/ui/StatCard';
import DataTable from '../../components/ui/DataTable';
import AnalyticsChart from '../../shared/AnalyticsChart';
import { Utensils, Truck, Users, DollarSign, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const activeDeliveries = [
  { id: 'DEL-001', customer: 'Emma Watson', address: '123 Park Ave', meal: 'Chicken & Rice Bowl', status: 'Out for Delivery' },
  { id: 'DEL-002', customer: 'James Smith', address: '456 Main St', meal: 'Salmon Delight', status: 'Preparing' },
  { id: 'DEL-003', customer: 'Olivia Brown', address: '789 Oak Ln', meal: 'Beef Stew', status: 'Delivered' },
];

const columns = [
  { header: 'Delivery ID', accessorKey: 'id' },
  { header: 'Customer', accessorKey: 'customer' },
  { header: 'Address', accessorKey: 'address' },
  { header: 'Meal Type', accessorKey: 'meal' },
  { 
    header: 'Status', 
    accessorKey: 'status',
    cell: (row) => (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
        ${row.status === 'Delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : ''}
        ${row.status === 'Preparing' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' : ''}
        ${row.status === 'Out for Delivery' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' : ''}
      `}>
        {row.status}
      </span>
    )
  },
  {
    header: 'Action',
    cell: () => (
      <button className="text-primary hover:text-primary/80 font-medium text-sm">
        Update Status
      </button>
    )
  }
];

export default function MealDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Meal Provider Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Track active subscriptions and today's delivery schedule.
          </p>
        </div>
        <Link 
          to="/vendor/menu/new" 
          className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          Add New Meal
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Active Subscriptions" value="128" icon={Users} trend="up" trendValue="5%" color="primary" />
        <StatCard title="Today's Deliveries" value="45" icon={Truck} color="warning" />
        <StatCard title="Weekly Revenue" value="$2,850" icon={DollarSign} trend="up" trendValue="12%" color="success" />
        <StatCard title="Meals Prepared" value="1,450" icon={Utensils} color="info" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2">
          <AnalyticsChart title="Subscription Growth" />
        </div>

        {/* Quick Delivery Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Delivery Timeline</h3>
          <div className="space-y-6">
            <div className="relative pl-6 border-l-2 border-green-500">
              <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-green-500 border-2 border-white dark:border-gray-800"></span>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Morning Route (Completed)</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">20/20 delivered</p>
            </div>
            <div className="relative pl-6 border-l-2 border-blue-500">
              <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500 border-2 border-white dark:border-gray-800"></span>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Afternoon Route (In Progress)</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">12/15 delivered</p>
            </div>
            <div className="relative pl-6 border-l-2 border-gray-200 dark:border-gray-700">
              <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-600 border-2 border-white dark:border-gray-800"></span>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Evening Route (Pending)</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">0/10 delivered</p>
            </div>
          </div>
          <button className="w-full mt-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            View Live Tracking
          </button>
        </div>
      </div>

      {/* Active Deliveries Table */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Current Delivery Queue</h3>
          <Link to="/vendor/deliveries" className="text-sm font-medium text-primary hover:text-primary/80">
            Manage all deliveries
          </Link>
        </div>
        <DataTable columns={columns} data={activeDeliveries} pagination={false} />
      </div>
    </div>
  );
}
