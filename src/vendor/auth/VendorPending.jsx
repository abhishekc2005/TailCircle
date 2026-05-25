import React from 'react';
import { useVendorAuth } from '../context/VendorAuthContext';
import { Clock, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function VendorPending() {
  const { vendorUser, logout } = useVendorAuth();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8">
        <Link to="/" className="flex justify-center items-center gap-2">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">TC</span>
          </div>
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            TailCircle <span className="text-primary">Vendor</span>
          </span>
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-10 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100 dark:border-gray-700 text-center">
          
          <div className="w-20 h-20 bg-yellow-50 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Clock className="w-10 h-10 text-yellow-500" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Application Pending</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Thank you for registering your business, <span className="font-semibold text-gray-900 dark:text-gray-200">{vendorUser?.businessName}</span>. 
            Our team is currently reviewing your application and documents. This usually takes 1-2 business days.
          </p>

          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-8">
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">What happens next?</h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 text-left space-y-2 list-disc list-inside">
              <li>Document verification by our admin team</li>
              <li>Background check for your service category</li>
              <li>Approval notification via email</li>
            </ul>
          </div>

          <button
            onClick={logout}
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none transition-colors"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
