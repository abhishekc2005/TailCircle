import React from 'react';
import StatCard from '../../components/ui/StatCard';
import DataTable from '../../components/ui/DataTable';
import AnalyticsChart from '../../shared/AnalyticsChart';
import { Calendar, Video, Stethoscope, Clock, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const todayAppointments = [
  { id: 'APT-001', petName: 'Bella', owner: 'Alice Cooper', time: '10:00 AM', type: 'Video Consult', status: 'Pending' },
  { id: 'APT-002', petName: 'Max', owner: 'Bob Builder', time: '11:30 AM', type: 'In-Clinic', status: 'Confirmed' },
  { id: 'APT-003', petName: 'Luna', owner: 'Charlie Day', time: '02:00 PM', type: 'Video Consult', status: 'Pending' },
];

const columns = [
  { header: 'Time', accessorKey: 'time' },
  { header: 'Pet Name', accessorKey: 'petName' },
  { header: 'Owner', accessorKey: 'owner' },
  { 
    header: 'Type', 
    accessorKey: 'type',
    cell: (row) => (
      <span className="flex items-center text-sm">
        {row.type === 'Video Consult' ? <Video className="w-4 h-4 mr-1 text-primary" /> : <Stethoscope className="w-4 h-4 mr-1 text-blue-500" />}
        {row.type}
      </span>
    )
  },
  { 
    header: 'Status', 
    accessorKey: 'status',
    cell: (row) => (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
        ${row.status === 'Confirmed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : ''}
        ${row.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' : ''}
      `}>
        {row.status}
      </span>
    )
  },
  {
    header: 'Action',
    cell: (row) => (
      <button className="text-primary hover:text-primary/80 font-medium text-sm flex items-center">
        {row.type === 'Video Consult' ? 'Join Call' : 'View Details'}
      </button>
    )
  }
];

export default function DoctorDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Doctor Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Manage your daily schedule and patient consultations.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
            <span className="relative flex h-3 w-3 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            Online
          </div>
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            Manage Availability
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Today's Appointments" value="8" icon={Calendar} color="primary" />
        <StatCard title="Pending Requests" value="3" icon={Clock} color="warning" />
        <StatCard title="Video Consults" value="5" icon={Video} color="info" />
        <StatCard title="Patients Treated" value="142" icon={CheckCircle} color="success" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2">
          <AnalyticsChart title="Consultations (Weekly)" />
        </div>

        {/* Next Appointment / Quick Actions */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-primary to-purple-600 rounded-xl p-6 shadow-md text-white">
            <h3 className="text-sm font-medium text-white/80 uppercase tracking-wider mb-2">Next Appointment</h3>
            <div className="flex items-center justify-between mt-4">
              <div>
                <p className="text-2xl font-bold">10:00 AM</p>
                <p className="text-lg mt-1">Bella (Golden Retriever)</p>
                <p className="text-sm text-white/80 mt-1 flex items-center">
                  <Video className="w-4 h-4 mr-1" /> Video Consult
                </p>
              </div>
            </div>
            <button className="w-full mt-6 py-2 bg-white text-primary font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
              Start Session
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/vendor/prescriptions" className="block text-sm text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary py-2 border-b border-gray-100 dark:border-gray-700">
                Upload Prescriptions
              </Link>
              <Link to="/vendor/patients" className="block text-sm text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary py-2 border-b border-gray-100 dark:border-gray-700">
                Patient Records
              </Link>
              <Link to="/vendor/certifications" className="block text-sm text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary py-2">
                Manage Certifications
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Appointments Table */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Schedule for Today</h3>
          <Link to="/vendor/appointments" className="text-sm font-medium text-primary hover:text-primary/80">
            View full calendar
          </Link>
        </div>
        <DataTable columns={columns} data={todayAppointments} pagination={false} />
      </div>
    </div>
  );
}
