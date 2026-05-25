import React from 'react';
import { motion } from 'framer-motion';

export default function StatCard({ title, value, icon: Icon, trend, trendValue, color = "primary" }) {
  const colorMap = {
    primary: "bg-primary/10 text-primary dark:bg-primary/20",
    success: "bg-green-100 text-green-600 dark:bg-green-900/20",
    warning: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20",
    danger: "bg-red-100 text-red-600 dark:bg-red-900/20",
    info: "bg-blue-100 text-blue-600 dark:bg-blue-900/20"
  };

  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</h3>
        </div>
        <div className={`p-3 rounded-lg ${colorMap[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      
      {trend && (
        <div className="mt-4 flex items-center text-sm">
          <span className={`font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {trend === 'up' ? '+' : '-'}{trendValue}
          </span>
          <span className="text-gray-500 dark:text-gray-400 ml-2">vs last month</span>
        </div>
      )}
    </motion.div>
  );
}
