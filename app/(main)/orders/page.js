"use client";
import { Button } from "primereact/button";
import React, { useState } from "react";

import ClientOnly from "@/components/ui/client-only";
import DataTable from "@/components/ui/data-table";
import TableSkeleton from "@/components/ui/table-skeleton";
import { useTableData } from "@/hooks/useTableData";
import {
  createTextColumn,
  createCurrencyColumn,
  createDateColumn,
  createTagColumn,
  createCustomColumn,
  statusConfigurations,
} from "@/utils/tableColumns";

const OrdersPage = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Generate deterministic mock data to avoid hydration issues
  const [initialOrders] = useState(() => {
    const customers = [
      "John Smith",
      "Jane Doe",
      "Mike Johnson",
      "Sarah Wilson",
      "David Brown",
      "Lisa Garcia",
      "Tom Miller",
      "Emma Davis",
    ];
    const paymentMethods = ["Credit Card", "PayPal", "Bank Transfer", "Cash"];

    return Array.from({ length: 40 }, (_, i) => {
      // Use deterministic values based on index
      const daysAgo = (i * 2) % 90; // Orders from last 90 days
      const orderDate = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);
      const items = ((i * 3) % 5) + 1; // 1-5 items
      const itemPrice = ((i * 13) % 90) + 10; // $10-$100
      const total = items * itemPrice;
      const streetNumber = ((i * 17) % 9999) + 1;
      const zipCode = ((i * 23) % 90000) + 10000;

      return {
        id: `ORD-${String(i + 1).padStart(4, "0")}`,
        orderNumber: `#${String(i + 1001).padStart(6, "0")}`,
        customer: customers[i % customers.length],
        items,
        total,
        status: statusConfigurations.order[i % statusConfigurations.order.length].value,
        orderDate: orderDate.toISOString(),
        shippingAddress: `${streetNumber} Main St, City, State ${zipCode}`,
        paymentMethod: paymentMethods[i % paymentMethods.length],
        discount: i % 5 === 0 ? (i % 20) + 1 : 0, // 20% of orders have discount
      };
    });
  });

  // Use the table data hook
  const { data: orders, loading } = useTableData(initialOrders);

  // Handle row click
  const handleRowClick = (event) => {
    setSelectedOrder(event.data);
    console.warn("Selected order:", event.data);
  };

  // Custom column templates
  const orderNumberTemplate = (rowData) => (
    <span className="font-mono text-blue-600 font-semibold">{rowData.orderNumber}</span>
  );

  const itemsTemplate = (rowData) => (
    <span className="bg-gray-100 px-2 py-1 rounded text-sm">
      {rowData.items} item{rowData.items !== 1 ? "s" : ""}
    </span>
  );

  const discountTemplate = (rowData) => {
    if (rowData.discount > 0) {
      return <span className="text-green-600 font-semibold">-{rowData.discount.toFixed(1)}%</span>;
    }
    return <span className="text-gray-400">-</span>;
  };

  // Define table columns
  const columns = [
    createCustomColumn("orderNumber", "Order #", orderNumberTemplate, {
      sortable: true,
      filter: true,
      style: { minWidth: "10rem" },
    }),
    createTextColumn("customer", "Customer", {
      style: { minWidth: "12rem" },
    }),
    createCustomColumn("items", "Items", itemsTemplate, {
      sortable: true,
      style: { minWidth: "8rem" },
    }),
    createCurrencyColumn("total", "Total", {
      style: { minWidth: "10rem" },
    }),
    createTagColumn("status", "Status", statusConfigurations.order, {
      style: { minWidth: "10rem" },
    }),
    createDateColumn("orderDate", "Order Date", {
      format: { year: "numeric", month: "short", day: "numeric" },
      style: { minWidth: "10rem" },
    }),
    createTextColumn("paymentMethod", "Payment", {
      filterType: "dropdown",
      filterOptions: ["Credit Card", "PayPal", "Bank Transfer", "Cash"],
      style: { minWidth: "10rem" },
    }),
    createCustomColumn("discount", "Discount", discountTemplate, {
      sortable: true,
      style: { minWidth: "8rem" },
    }),
  ];

  // Table actions
  const tableActions = (
    <>
      <Button
        label="New Order"
        icon="pi pi-plus"
        className="p-button-sm"
        onClick={() => console.warn("Create new order")}
      />
      <Button
        label="Bulk Actions"
        icon="pi pi-cog"
        className="p-button-sm p-button-outlined"
        onClick={() => console.warn("Bulk actions")}
      />
    </>
  );

  return (
    <div className="space-y-6">
      <ClientOnly fallback={<TableSkeleton />}>
        <DataTable
          data={orders}
          columns={columns}
          loading={loading}
          title="Orders Management"
          searchPlaceholder="Search orders..."
          emptyMessage="No orders found."
          onRowClick={handleRowClick}
          globalFilterFields={["orderNumber", "customer", "paymentMethod"]}
          exportable
          onExport={() => console.warn("Export orders")}
          actions={tableActions}
          rows={20}
          rowsPerPageOptions={[10, 20, 50, 100]}
          sortMode="multiple"
          stripedRows
        />
      </ClientOnly>

      {selectedOrder && (
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Order Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p>
                <strong>Order Number:</strong> {selectedOrder.orderNumber}
              </p>
              <p>
                <strong>Customer:</strong> {selectedOrder.customer}
              </p>
              <p>
                <strong>Items:</strong> {selectedOrder.items}
              </p>
              <p>
                <strong>Total:</strong> ${selectedOrder.total.toFixed(2)}
              </p>
            </div>
            <div>
              <p>
                <strong>Status:</strong> {selectedOrder.status}
              </p>
              <p>
                <strong>Payment:</strong> {selectedOrder.paymentMethod}
              </p>
              <p>
                <strong>Discount:</strong> {selectedOrder.discount.toFixed(1)}%
              </p>
              <p>
                <strong>Order Date:</strong>{" "}
                {new Date(selectedOrder.orderDate).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="mt-4">
            <p>
              <strong>Shipping Address:</strong>
            </p>
            <p className="text-gray-600">{selectedOrder.shippingAddress}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
