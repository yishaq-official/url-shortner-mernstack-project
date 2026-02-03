import React from 'react';

const StatsCard = ({ title, value, icon, color }) => {
  // Map color prop to specific Tailwind classes
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
  };

  const activeColor = colorClasses[color] || colorClasses.blue;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-start space-x-4 hover:shadow-md transition-shadow duration-200">
      
      {/* 1. The Icon Box */}
      <div className={`p-3 rounded-lg flex-shrink-0 ${activeColor}`}>
        {icon}
      </div>

      {/* 2. The Data */}
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
          {title}
        </p>
        <h3 className="text-2xl font-bold text-gray-900 mt-1">
          {value}
        </h3>
      </div>

    </div>
  );
};

export default StatsCard;