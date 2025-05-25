"use client";

import React from "react";

import { cn } from "@/lib/utils";

const DataDisplay = ({
  title = "Selected Item",
  data,
  className,
  format = "json", // "json", "table", "cards"
  maxHeight = "400px",
  ...props
}) => {
  if (!data) {
    return null;
  }

  const renderJsonFormat = () => (
    <pre className="text-sm bg-gray-100 p-3 rounded overflow-auto" style={{ maxHeight }}>
      {JSON.stringify(data, null, 2)}
    </pre>
  );

  const renderTableFormat = () => (
    <div className="overflow-auto" style={{ maxHeight }}>
      <table className="w-full text-sm">
        <tbody>
          {Object.entries(data).map(([key, value]) => (
            <tr key={key} className="border-b border-gray-100">
              <td className="py-2 pr-4 font-medium text-gray-700 capitalize">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </td>
              <td className="py-2 text-gray-900">
                {typeof value === "object" ? JSON.stringify(value) : String(value)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderCardsFormat = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4" style={{ maxHeight, overflow: "auto" }}>
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="bg-gray-50 p-3 rounded">
          <div className="text-sm font-medium text-gray-700 capitalize mb-1">
            {key.replace(/([A-Z])/g, " $1").trim()}
          </div>
          <div className="text-gray-900">
            {typeof value === "object" ? JSON.stringify(value) : String(value)}
          </div>
        </div>
      ))}
    </div>
  );

  const renderContent = () => {
    switch (format) {
      case "table":
        return renderTableFormat();
      case "cards":
        return renderCardsFormat();
      default:
        return renderJsonFormat();
    }
  };

  return (
    <div
      className={cn("bg-white p-4 rounded-lg shadow-sm border border-gray-100", className)}
      {...props}
    >
      <h3 className="text-lg font-semibold mb-3 text-gray-900">{title}</h3>
      {renderContent()}
    </div>
  );
};

// Specialized variants
const SelectedUserDisplay = ({ user, ...props }) => (
  <DataDisplay title="Selected User" data={user} format="cards" {...props} />
);

const SelectedOrderDisplay = ({ order, ...props }) => (
  <DataDisplay title="Order Details" data={order} format="table" {...props} />
);

const SelectedProductDisplay = ({ product, ...props }) => (
  <DataDisplay title="Product Details" data={product} format="cards" {...props} />
);

export { DataDisplay, SelectedUserDisplay, SelectedOrderDisplay, SelectedProductDisplay };
