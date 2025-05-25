"use client";

const TableSkeleton = () => (
  <div className="p-6 bg-white rounded-lg shadow-sm">
    {/* Header skeleton */}
    <div className="flex justify-between items-center mb-6">
      <div className="h-6 bg-gray-200 rounded w-32 animate-pulse" />
      <div className="h-10 bg-gray-200 rounded w-64 animate-pulse" />
    </div>

    {/* Table skeleton */}
    <div className="space-y-3">
      {/* Table header */}
      <div className="grid grid-cols-5 gap-4 pb-3 border-b">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-4 bg-gray-200 rounded animate-pulse" />
        ))}
      </div>

      {/* Table rows */}
      {Array.from({ length: 8 }).map((_, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-5 gap-4 py-3 border-b border-gray-100">
          {Array.from({ length: 5 }).map((_, colIndex) => (
            <div
              key={colIndex}
              className="h-4 bg-gray-100 rounded animate-pulse"
              style={{ animationDelay: `${(rowIndex * 5 + colIndex) * 50}ms` }}
            />
          ))}
        </div>
      ))}
    </div>

    {/* Pagination skeleton */}
    <div className="flex justify-between items-center mt-6 pt-4 border-t">
      <div className="h-4 bg-gray-200 rounded w-32 animate-pulse" />
      <div className="flex gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
        ))}
      </div>
    </div>
  </div>
);

export default TableSkeleton;
