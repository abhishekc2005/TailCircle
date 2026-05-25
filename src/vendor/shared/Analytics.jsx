import React from 'react';
import AnalyticsChart from './AnalyticsChart';

export default function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Analytics</h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Detailed performance metrics and revenue overview for your business.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsChart title="Revenue Overview" />
        <AnalyticsChart title="Booking Growth" />
      </div>
    </div>
  );
}
