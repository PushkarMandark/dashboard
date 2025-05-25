"use client";

import React from "react";

import { cn } from "@/lib/utils";

const StatsCard = ({
  title,
  value,
  icon: Icon,
  iconColor = "text-blue-600",
  iconBgColor = "bg-blue-100",
  trend,
  trendDirection = "up", // "up", "down", "neutral"
  className,
  ...props
}) => {
  const getTrendColor = () => {
    switch (trendDirection) {
      case "up":
        return "text-green-600";
      case "down":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const getTrendIcon = () => {
    switch (trendDirection) {
      case "up":
        return "↗";
      case "down":
        return "↘";
      default:
        return "→";
    }
  };

  return (
    <div
      className={cn(
        "bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow",
        className,
      )}
      {...props}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
          {trend && (
            <div className={cn("flex items-center mt-2 text-sm", getTrendColor())}>
              <span className="mr-1">{getTrendIcon()}</span>
              <span>{trend}</span>
            </div>
          )}
        </div>
        {Icon && (
          <div
            className={cn("w-12 h-12 rounded-full flex items-center justify-center", iconBgColor)}
          >
            <Icon className={cn("w-6 h-6", iconColor)} />
          </div>
        )}
      </div>
    </div>
  );
};

// Preset variants for common use cases
const OrdersStatsCard = (props) => (
  <StatsCard
    title="Orders"
    icon={({ className }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>
    )}
    iconColor="text-blue-600"
    iconBgColor="bg-blue-100"
    {...props}
  />
);

const RevenueStatsCard = (props) => (
  <StatsCard
    title="Revenue"
    icon={({ className }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
        />
      </svg>
    )}
    iconColor="text-green-600"
    iconBgColor="bg-green-100"
    {...props}
  />
);

const UsersStatsCard = (props) => (
  <StatsCard
    title="Users"
    icon={({ className }) => (
      <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
        />
      </svg>
    )}
    iconColor="text-purple-600"
    iconBgColor="bg-purple-100"
    {...props}
  />
);

export { StatsCard, OrdersStatsCard, RevenueStatsCard, UsersStatsCard };
