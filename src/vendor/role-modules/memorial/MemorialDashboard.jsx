import React from 'react';
import StatCard from '../../components/ui/StatCard';
import DataTable from '../../components/ui/DataTable';
import AnalyticsChart from '../../shared/AnalyticsChart';
import { HeartHandshake, Users, CalendarDays, DollarSign, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const activeRequests = [
  { id: 'REQ-001', family: 'Johnson Family', service: 'Cremation & Urn', date: 'Today, 2:00 PM', location: '123 Main St', status: 'In Progress' },
  { id: 'REQ-002', family: 'Smith Family', service: 'Burial Service', date: 'Tomorrow, 10:00 AM', location: 'Sunset Memorial Garden', status: 'Scheduled' },
  { id: 'REQ-003', family: 'Davis Family', service: 'Memorial Plaque', date: 'Oct 26, 2023', location: 'Workshop', status: 'Pending' },
];

const columns = [
  { header: 'Request ID', accessorKey: 'id' },
  { header: 'Family', accessorKey: 'family' },
  { header: 'Service Type', accessorKey: 'service' },
  { 
    header: 'Location', 
    accessorKey: 'location',
    cell: (row) => (
      <span className="flex items-center text-sm text-gray-600 dark:text-gray-400">
        <MapPin className="w-4 h-4 mr-1 text-gray-400" />
        {row.location}
      </span>
    )
  },
  { 
    header: 'Status', 
    accessorKey: 'status',
    cell: (row) => (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
        ${row.status === 'In Progress' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' : ''}
        ${row.status === 'Scheduled' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : ''}
        ${row.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' : ''}
      `}>
        {row.status}
      </span>
    )
  },
  {
    header: 'Action',
    cell: () => (
      <button className="text-primary hover:text-primary/80 font-medium text-sm">
        Manage
      </button>
    )
  }
];

export default function MemorialDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Memorial Services Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Manage incoming requests and service schedules with care.
          </p>
        </div>
        <Link 
          to="/vendor/requests" 
          className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          View All Requests
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Active Requests" value="5" icon={HeartHandshake} color="primary" />
        <StatCard title="Services This Month" value="28" icon={CalendarDays} color="info" />
        <StatCard title="Team Members" value="6" icon={Users} color="warning" />
        <StatCard title="Revenue (MTD)" value="$8,400" icon={DollarSign} trend="up" trendValue="5%" color="success" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2">
          <AnalyticsChart title="Service Requests (Last 30 Days)" />
        </div>

        {/* Action Center */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Urgent Actions</h3>
          
          <div className="space-y-4">
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-900/30 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">New Request Received</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Wilson Family - Cremation Service</p>
                </div>
                <span className="text-xs font-medium text-yellow-600 dark:text-yellow-400">10m ago</span>
              </div>
              <div className="mt-3 flex gap-2">
                <button className="flex-1 py-1.5 px-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 text-sm font-medium rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  Review Details
                </button>
                <button className="flex-1 py-1.5 px-3 bg-primary text-white text-sm font-medium rounded-md hover:bg-primary/90 transition-colors">
                  Accept
                </button>
              </div>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900/30 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Upload Completion Proof</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">REQ-001 (Johnson Family)</p>
                </div>
              </div>
              <button className="w-full mt-3 py-1.5 px-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 text-sm font-medium rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                Upload Document
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Active Requests Table */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Active Service Schedule</h3>
          <Link to="/vendor/schedule" className="text-sm font-medium text-primary hover:text-primary/80">
            View full calendar
          </Link>
        </div>
        <DataTable columns={columns} data={activeRequests} pagination={false} />
      </div>
    </div>
  );
}
