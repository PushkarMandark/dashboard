"use client";
import React, { useState } from "react";

import ProductEditForm from "@/components/features/ProductEditForm";
import ClientOnly from "@/components/ui/client-only";
import DataTable from "@/components/ui/data-table";
import { PageContainer } from "@/components/ui/page-container";
import TableSkeleton from "@/components/ui/table-skeleton";
import { useTableData } from "@/hooks/useTableData";
import { generateProducts } from "@/utils/mockDataGenerator";
import {
  createTextColumn,
  createCurrencyColumn,
  createTagColumn,
  createNumberColumn,
  statusConfigurations,
  categoryConfigurations,
} from "@/utils/tableColumns";

const Dashboard = () => {
  // Dialog state
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState("edit"); // "edit" or "view"

  // Generate deterministic mock data to avoid hydration issues
  const [initialData] = useState(() => generateProducts(30));

  // Use the table data hook
  const { data: products, loading, updateItem } = useTableData(initialData);

  // Handle row click
  const handleRowClick = (event) => {
    setSelectedProduct(event.data);
    setDialogMode("edit");
    setIsDialogOpen(true);
  };

  // Handle product save
  const handleProductSave = (updatedProduct) => {
    updateItem(updatedProduct);
  };

  // Handle dialog close
  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setSelectedProduct(null);
  };

  // Define table columns
  const columns = [
    createTextColumn("name", "Name", {
      filterPlaceholder: "Search by name",
      style: { minWidth: "12rem" },
    }),
    createCurrencyColumn("price", "Price", {
      style: { minWidth: "8rem" },
    }),
    createTagColumn(
      "category",
      "Category",
      categoryConfigurations.product.map((cat) => ({ value: cat, label: cat })),
      {
        filterType: "dropdown",
        filterOptions: categoryConfigurations.product,
        style: { minWidth: "12rem" },
      },
    ),
    createTagColumn("status", "Status", statusConfigurations.product, {
      style: { minWidth: "12rem" },
    }),
    createNumberColumn("rating", "Rating", {
      style: { minWidth: "8rem" },
    }),
  ];

  return (
    <PageContainer>
      <ClientOnly fallback={<TableSkeleton />}>
        <DataTable
          data={products}
          columns={columns}
          loading={loading}
          title="Products"
          searchPlaceholder="Search products..."
          emptyMessage="No products found."
          onRowClick={handleRowClick}
          globalFilterFields={["name", "category", "status"]}
          exportable
          onExport={() => console.warn("Export functionality")}
        />
      </ClientOnly>

      {/* Product Edit Dialog */}
      <ProductEditForm
        product={selectedProduct}
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        onSave={handleProductSave}
        mode={dialogMode}
      />
    </PageContainer>
  );
};

export default Dashboard;
