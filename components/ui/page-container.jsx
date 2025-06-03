"use client";

import React from "react";

import { cn } from "@/lib/utils";

const PageContainer = ({
  children,
  className,
  maxWidth = "full",
  padding = "default",
  ...props
}) => {
  const getPaddingClass = () => {
    switch (padding) {
      case "none":
        return "";
      case "sm":
        return "p-4";
      case "lg":
        return "";
      default:
        return "";
    }
  };

  const getMaxWidthClass = () => {
    switch (maxWidth) {
      case "sm":
        return "max-w-2xl";
      case "md":
        return "max-w-4xl";
      case "lg":
        return "max-w-6xl";
      case "xl":
        return "max-w-7xl";
      default:
        return "max-w-full";
    }
  };

  return (
    <div
      className={cn("w-full mx-auto space-y-6", getMaxWidthClass(), getPaddingClass(), className)}
      {...props}
    >
      {children}
    </div>
  );
};

const PageHeader = ({ title, subtitle, actions, className, ...props }) => (
  <div className={cn("flex items-center justify-between mb-6", className)} {...props}>
    <div>
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
    </div>
    {actions && <div className="flex items-center gap-2">{actions}</div>}
  </div>
);

const PageSection = ({
  title,
  subtitle,
  children,
  className,
  headerActions,
  collapsible = false,
  defaultExpanded = true,
  ...props
}) => {
  const [isExpanded, setIsExpanded] = React.useState(defaultExpanded);

  return (
    <div className={cn("space-y-4", className)} {...props}>
      {title && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {collapsible && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1 hover:bg-gray-100 rounded"
                aria-expanded={isExpanded}
              >
                <svg
                  className={cn("w-4 h-4 transition-transform", isExpanded ? "rotate-90" : "")}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            )}
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
              {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
            </div>
          </div>
          {headerActions && <div className="flex items-center gap-2">{headerActions}</div>}
        </div>
      )}
      {(!collapsible || isExpanded) && children}
    </div>
  );
};

export { PageContainer, PageHeader, PageSection };
