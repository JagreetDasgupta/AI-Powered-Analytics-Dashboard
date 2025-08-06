import React from 'react';

export const CardSkeleton = () => (
  <div className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-xl p-4 animate-pulse">
    <div className="flex justify-between items-start">
      <div className="flex-1">
        <div className="h-4 bg-white/20 rounded w-24 mb-2"></div>
        <div className="h-8 bg-white/20 rounded w-20 mb-2"></div>
        <div className="h-3 bg-white/20 rounded w-32"></div>
      </div>
      <div className="h-10 w-10 bg-white/20 rounded-full"></div>
    </div>
    <div className="mt-3 h-10 bg-white/15 rounded-md"></div>
  </div>
);

export const TableRowSkeleton = () => (
  <tr className="animate-pulse">
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex items-center">
        <div className="h-4 w-4 bg-white/20 rounded mr-3"></div>
        <div className="h-4 bg-white/20 rounded w-32"></div>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="h-4 bg-white/20 rounded w-16"></div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="h-4 bg-white/20 rounded w-20"></div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="h-4 bg-white/20 rounded w-16"></div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="h-4 bg-white/20 rounded w-12"></div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex items-center gap-2">
        <div className="h-6 w-6 bg-white/20 rounded"></div>
        <div className="h-6 w-6 bg-white/20 rounded"></div>
      </div>
    </td>
  </tr>
);

export const SettingsSkeleton = () => (
  <div className="space-y-6 animate-pulse">
    <div className="space-y-4">
      <div className="h-6 bg-white/20 rounded w-32"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="h-4 bg-white/20 rounded w-20"></div>
          <div className="h-10 bg-white/20 rounded"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-white/20 rounded w-24"></div>
          <div className="h-10 bg-white/20 rounded"></div>
        </div>
      </div>
    </div>
  </div>
);