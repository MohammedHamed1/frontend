import React from 'react';

const LoadingSpinner = ({ size = 'md', color = 'green', text = 'جاري التحميل...' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const colorClasses = {
    green: 'text-green-500',
    blue: 'text-blue-500',
    purple: 'text-purple-500',
    gray: 'text-gray-500'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className={`${sizeClasses[size]} ${colorClasses[color]} animate-spin rounded-full border-4 border-gray-200 border-t-current`}></div>
      {text && (
        <p className="mt-4 text-gray-600 font-medium animate-pulse">{text}</p>
      )}
    </div>
  );
};

export default LoadingSpinner; 