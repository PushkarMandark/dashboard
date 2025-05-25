"use client";

import React from "react";

import { cn } from "@/lib/utils";

const ChartCard = ({
  title,
  subtitle,
  children,
  actions,
  className,
  height = "300px",
  loading = false,
  error = null,
  ...props
}) => {
  if (error) {
    return (
      <div
        className={cn("bg-white rounded-lg p-6 shadow-sm border border-gray-100", className)}
        {...props}
      >
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="text-red-500 mb-2">⚠️</div>
            <p className="text-gray-600">Failed to load chart</p>
            <p className="text-sm text-gray-500">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn("bg-white rounded-lg p-6 shadow-sm border border-gray-100", className)}
      {...props}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>

      {/* Chart Content */}
      <div className="relative" style={{ height }}>
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 rounded">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <span className="text-gray-600">Loading chart...</span>
            </div>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

export { ChartCard };
