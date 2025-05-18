import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const DashboardCard = ({ title, count, icon, path, color }) => {
  // Define color classes based on the color prop
  const colorClasses = {
    blue: {
      bg: 'bg-blue-100 dark:bg-blue-900/30',
      text: 'text-blue-600 dark:text-blue-400',
      iconBg: 'bg-blue-200 dark:bg-blue-800'
    },
    green: {
      bg: 'bg-green-100 dark:bg-green-900/30',
      text: 'text-green-600 dark:text-green-400',
      iconBg: 'bg-green-200 dark:bg-green-800'
    },
    purple: {
      bg: 'bg-purple-100 dark:bg-purple-900/30',
      text: 'text-purple-600 dark:text-purple-400',
      iconBg: 'bg-purple-200 dark:bg-purple-800'
    },
    orange: {
      bg: 'bg-orange-100 dark:bg-orange-900/30',
      text: 'text-orange-600 dark:text-orange-400',
      iconBg: 'bg-orange-200 dark:bg-orange-800'
    },
    teal: {
      bg: 'bg-teal-100 dark:bg-teal-900/30',
      text: 'text-teal-600 dark:text-teal-400',
      iconBg: 'bg-teal-200 dark:bg-teal-800'
    }
  };

  const classes = colorClasses[color] || colorClasses.blue;

  return (
    <div className={`${classes.bg} rounded-lg shadow-sm p-6`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h3>
          <p className="text-3xl font-bold mt-2 mb-2 text-gray-900 dark:text-white">{count}</p>
        </div>
        <div className={`p-3 rounded-full ${classes.iconBg}`}>
          {icon}
        </div>
      </div>
      <Link 
        to={path} 
        className={`flex items-center text-sm font-medium mt-4 ${classes.text} hover:underline`}
      >
        View Details <ArrowRight size={16} className="ml-1" />
      </Link>
    </div>
  );
};

export default DashboardCard;