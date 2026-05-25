import React from 'react';
import StatCard from '../../components/ui/StatCard';
import DataTable from '../../components/ui/DataTable';
import AnalyticsChart from '../../shared/AnalyticsChart';
import { Calendar, Users, Ticket, DollarSign, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const upcomingEvents = [
  { id: 'EVT-001', name: 'Puppy Training Basics', date: 'Oct 24, 2023', attendees: '15/20', status: 'Upcoming' },
  { id: 'EVT-002', name: 'Dog Show 2023', date: 'Nov 12, 2023', attendees: '45/50', status: 'Selling Fast' },
  { id: 'EVT-003', name: 'Pet Adoption Drive', date: 'Dec 05, 2023', attendees: '80/100', status: 'Upcoming' },
];

const columns = [
  { header: 'Event Name', accessorKey: 'name' },
  { header: 'Date', accessorKey: 'date' },
  { header: 'Attendees', accessorKey: 'attendees' },
  { 
    header: 'Status', 
    accessorKey: 'status',
    cell: (row) => (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
        ${row.status === 'Upcoming' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' : ''}
        ${row.status === 'Selling Fast' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400' : ''}
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

export default function EventDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Event Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Manage your upcoming events and ticket sales.
          </p>
        </div>
        <Link 
          to="/vendor/events/new" 
          className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          Create Event
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Events" value="12" icon={Calendar} trend="up" trendValue="2" color="primary" />
        <StatCard title="Tickets Sold" value="450" icon={Ticket} trend="up" trendValue="15%" color="success" />
        <StatCard title="Total Revenue" value="$4,500" icon={DollarSign} trend="up" trendValue="10%" color="info" />
        <StatCard title="Upcoming" value="3" icon={Clock} color="warning" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2">
          <AnalyticsChart title="Ticket Sales (Monthly)" />
        </div>

        {/* Quick Actions / Summary */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <span className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-200">
                <Calendar className="w-5 h-5 mr-3 text-primary" />
                Manage Calendar
              </span>
            </button>
            <button className="w-full flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <span className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-200">
                <Users className="w-5 h-5 mr-3 text-green-500" />
                View Attendees
              </span>
            </button>
            <button className="w-full flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <span className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-200">
                <Ticket className="w-5 h-5 mr-3 text-orange-500" />
                Promo Codes
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Upcoming Events Table */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Upcoming Events</h3>
          <Link to="/vendor/events" className="text-sm font-medium text-primary hover:text-primary/80">
            View all events
          </Link>
        </div>
        <DataTable columns={columns} data={upcomingEvents} pagination={false} />
      </div>
    </div>
  );
}
