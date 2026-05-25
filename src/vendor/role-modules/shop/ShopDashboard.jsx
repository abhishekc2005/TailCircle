import React from 'react';
import StatCard from '../../components/ui/StatCard';
import DataTable from '../../components/ui/DataTable';
import AnalyticsChart from '../../shared/AnalyticsChart';
import { ShoppingBag, Package, Truck, DollarSign, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const recentOrders = [
  { id: 'ORD-001', customer: 'John Doe', amount: '$45.00', status: 'Pending', date: 'Today, 10:30 AM' },
  { id: 'ORD-002', customer: 'Sarah Smith', amount: '$120.50', status: 'Processing', date: 'Today, 09:15 AM' },
  { id: 'ORD-003', customer: 'Mike Johnson', amount: '$34.00', status: 'Delivered', date: 'Yesterday, 04:20 PM' },
  { id: 'ORD-004', customer: 'Emily Davis', amount: '$89.99', status: 'Pending', date: 'Yesterday, 02:10 PM' },
];

const columns = [
  { header: 'Order ID', accessorKey: 'id' },
  { header: 'Customer', accessorKey: 'customer' },
  { header: 'Amount', accessorKey: 'amount' },
  { 
    header: 'Status', 
    accessorKey: 'status',
    cell: (row) => (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
        ${row.status === 'Delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : ''}
        ${row.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' : ''}
        ${row.status === 'Processing' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' : ''}
      `}>
        {row.status}
      </span>
    )
  },
  { header: 'Date', accessorKey: 'date' },
  {
    header: 'Action',
    cell: () => (
      <button className="text-primary hover:text-primary/80 font-medium text-sm">
        View
      </button>
    )
  }
];

export default function ShopDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Shop Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Overview of your store's performance today.
          </p>
        </div>
        <Link 
          to="/vendor/products/new" 
          className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
        >
          Add Product
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Today's Orders" value="24" icon={ShoppingBag} trend="up" trendValue="12%" color="primary" />
        <StatCard title="Total Revenue" value="$1,245" icon={DollarSign} trend="up" trendValue="8%" color="success" />
        <StatCard title="Pending Deliveries" value="12" icon={Truck} trend="down" trendValue="2%" color="warning" />
        <StatCard title="Average Rating" value="4.8" icon={Star} trend="up" trendValue="0.2" color="info" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2">
          <AnalyticsChart title="Weekly Revenue" />
        </div>

        {/* Top Products / Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Inventory Alerts</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center p-3 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-100 dark:border-red-900/30">
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center text-red-600 dark:text-red-400 mr-3">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Premium Dog Food {i}</p>
                  <p className="text-xs text-red-600 dark:text-red-400">Only 2 items left in stock</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            Manage Inventory
          </button>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Orders</h3>
          <Link to="/vendor/orders" className="text-sm font-medium text-primary hover:text-primary/80">
            View all orders
          </Link>
        </div>
        <DataTable columns={columns} data={recentOrders} pagination={false} />
      </div>
    </div>
  );
}
