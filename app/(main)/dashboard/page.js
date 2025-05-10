"use client";
import { FilterMatchMode } from "primereact/api";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    category: { value: null, matchMode: FilterMatchMode.EQUALS },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
    price: { value: null, matchMode: FilterMatchMode.EQUALS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const mockData = Array.from({ length: 30 }, (_, i) => ({
      id: i + 1,
      name: `Product ${i + 1}`,
      price: Math.floor(Math.random() * 1000) + 10,
      category: ["Electronics", "Clothing", "Accessories", "Furniture"][
        Math.floor(Math.random() * 4)
      ],
      status: ["In Stock", "Low Stock", "Out of Stock"][Math.floor(Math.random() * 3)],
      rating: Math.floor(Math.random() * 5) + 1,
    }));

    setProducts(mockData);
    setLoading(false);
  }, []);

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    const _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const renderHeader = () => (
    <div className="flex justify-between items-center">
      <h5 className="m-0">Products</h5>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          value={globalFilterValue}
          onChange={onGlobalFilterChange}
          placeholder="Search"
          className="p-inputtext-sm"
        />
      </span>
    </div>
  );

  const statusBodyTemplate = (rowData) => {
    const statusMap = {
      "In Stock": { severity: "success", label: "In Stock" },
      "Low Stock": { severity: "warning", label: "Low Stock" },
      "Out of Stock": { severity: "danger", label: "Out of Stock" },
    };

    const status = statusMap[rowData.status];

    return <Tag severity={status.severity} value={status.label} />;
  };

  const statusFilterTemplate = (options) => (
    <Dropdown
      value={options.value}
      options={["In Stock", "Low Stock", "Out of Stock"]}
      onChange={(e) => options.filterCallback(e.value)}
      placeholder="Select a Status"
      className="p-column-filter"
      showClear
    />
  );

  const categoryFilterTemplate = (options) => (
    <Dropdown
      value={options.value}
      options={["Electronics", "Clothing", "Accessories", "Furniture"]}
      onChange={(e) => options.filterCallback(e.value)}
      placeholder="Select a Category"
      className="p-column-filter"
      showClear
    />
  );

  const header = renderHeader();

  return (
    <div className="card p-6 bg-white rounded-lg shadow-sm">
      <DataTable
        value={products}
        paginator
        rows={10}
        rowsPerPageOptions={[5, 10, 25]}
        dataKey="id"
        filters={filters}
        filterDisplay="menu"
        loading={loading}
        responsiveLayout="scroll"
        globalFilterFields={["name", "category", "status"]}
        header={header}
        emptyMessage="No products found."
        className="p-datatable-sm"
      >
        <Column
          field="name"
          header="Name"
          filter
          filterPlaceholder="Search by name"
          style={{ minWidth: "12rem" }}
        />
        <Column
          field="price"
          header="Price"
          body={(data) => `$${data.price.toFixed(2)}`}
          sortable
          style={{ minWidth: "8rem" }}
        />
        <Column
          field="category"
          header="Category"
          filter
          filterElement={categoryFilterTemplate}
          style={{ minWidth: "12rem" }}
        />
        <Column
          field="status"
          header="Status"
          body={statusBodyTemplate}
          filter
          filterElement={statusFilterTemplate}
          style={{ minWidth: "12rem" }}
        />
        <Column field="rating" header="Rating" sortable style={{ minWidth: "8rem" }} />
      </DataTable>
    </div>
  );
};

export default Dashboard;
