"use client";

import Image from "next/image";
import { FilterMatchMode } from "primereact/api";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Column } from "primereact/column";
import { DataTable as PrimeDataTable } from "primereact/datatable";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Tag } from "primereact/tag";
import React, { useState, useEffect, useMemo } from "react";

const DataTable = ({
  data = [],
  columns = [],
  loading = false,
  title = "Data",
  searchPlaceholder = "Search...",
  emptyMessage = "No data found.",
  onRowClick,
  onRowSelect,
  selectionMode = "single",
  paginator = true,
  rows = 10,
  rowsPerPageOptions = [5, 10, 25, 50],
  sortMode = "multiple",
  filterDisplay = "menu",
  globalFilterFields = [],
  showGridlines = false,
  stripedRows = false,
  className = "",
  tableStyle = {},
  exportable = false,
  onExport,
  actions,
  ...props
}) => {
  const [filters, setFilters] = useState({});
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [selectedRows, setSelectedRows] = useState(null);

  // Initialize filters based on columns
  useEffect(() => {
    const initialFilters = {
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    };

    columns.forEach((col) => {
      if (col.filter) {
        const matchMode = col.filterMatchMode || FilterMatchMode.STARTS_WITH;
        initialFilters[col.field] = { value: null, matchMode };
      }
    });

    setFilters(initialFilters);
  }, [columns]);

  // Handle global filter change
  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    const _filters = { ...filters };
    _filters["global"].value = value;
    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  // Handle row click
  const handleRowClick = (event) => {
    if (onRowClick) {
      onRowClick(event);
    }
  };

  // Handle row selection
  const handleRowSelect = (event) => {
    setSelectedRows(event.value);
    if (onRowSelect) {
      onRowSelect(event.value);
    }
  };

  // Render table header with search and actions
  const renderHeader = () => (
    <div className="flex justify-between items-center flex-wrap gap-4">
      <div className="flex items-center gap-4">
        <h5 className="m-0 text-lg font-semibold">{title}</h5>
        {actions && <div className="flex gap-2">{actions}</div>}
      </div>
      <div className="flex items-center gap-2">
        {exportable && (
          <Button
            type="button"
            icon="pi pi-file-excel"
            severity="success"
            rounded
            onClick={onExport}
            data-pr-tooltip="Export to Excel"
            size="small"
          />
        )}
        <div className="search-input-container">
          <i className="pi pi-search search-icon" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder={searchPlaceholder}
            className="p-inputtext-sm"
            style={{ paddingLeft: "2.5rem", minWidth: "250px" }}
          />
        </div>
      </div>
    </div>
  );

  // Create filter templates based on column type
  const createFilterTemplate = (column) => {
    const { filterType, filterOptions } = column;

    switch (filterType) {
      case "dropdown": {
        const DropdownFilter = (options) => (
          <Dropdown
            value={options.value}
            options={filterOptions}
            onChange={(e) => options.filterCallback(e.value)}
            placeholder={`Select ${column.header}`}
            className="p-column-filter"
            showClear
          />
        );
        DropdownFilter.displayName = "DropdownFilter";
        return DropdownFilter;
      }

      case "multiselect": {
        const MultiselectFilter = (options) => (
          <Dropdown
            value={options.value}
            options={filterOptions}
            onChange={(e) => options.filterCallback(e.value)}
            placeholder={`Select ${column.header}`}
            className="p-column-filter"
            showClear
            multiple
          />
        );
        MultiselectFilter.displayName = "MultiselectFilter";
        return MultiselectFilter;
      }

      case "date": {
        const DateFilter = (options) => (
          <Calendar
            value={options.value}
            onChange={(e) => options.filterCallback(e.value)}
            placeholder="Select date"
            className="p-column-filter"
            showIcon
          />
        );
        DateFilter.displayName = "DateFilter";
        return DateFilter;
      }

      case "number": {
        const NumberFilter = (options) => (
          <InputText
            value={options.value}
            onChange={(e) => options.filterCallback(e.target.value)}
            placeholder={`Filter by ${column.header}`}
            className="p-column-filter"
            type="number"
          />
        );
        NumberFilter.displayName = "NumberFilter";
        return NumberFilter;
      }

      default: {
        const TextFilter = (options) => (
          <InputText
            value={options.value}
            onChange={(e) => options.filterCallback(e.target.value)}
            placeholder={`Search by ${column.header}`}
            className="p-column-filter"
          />
        );
        TextFilter.displayName = "TextFilter";
        return TextFilter;
      }
    }
  };

  // Create body templates based on column type
  const createBodyTemplate = (column) => {
    const { type, field, format, options } = column;

    switch (type) {
      case "currency": {
        const CurrencyTemplate = (rowData) => {
          const value = rowData[field];
          return value != null ? `$${Number(value).toFixed(2)}` : "";
        };
        CurrencyTemplate.displayName = "CurrencyTemplate";
        return CurrencyTemplate;
      }

      case "percentage": {
        const PercentageTemplate = (rowData) => {
          const value = rowData[field];
          return value != null ? `${Number(value).toFixed(1)}%` : "";
        };
        PercentageTemplate.displayName = "PercentageTemplate";
        return PercentageTemplate;
      }

      case "date": {
        const DateTemplate = (rowData) => {
          const value = rowData[field];
          if (!value) return "";
          const date = new Date(value);
          return format ? date.toLocaleDateString(undefined, format) : date.toLocaleDateString();
        };
        DateTemplate.displayName = "DateTemplate";
        return DateTemplate;
      }

      case "tag": {
        const TagTemplate = (rowData) => {
          const value = rowData[field];
          const option = options?.find((opt) => opt.value === value);
          return option ? (
            <Tag severity={option.severity} value={option.label || value} />
          ) : (
            <Tag value={value} />
          );
        };
        TagTemplate.displayName = "TagTemplate";
        return TagTemplate;
      }

      case "boolean": {
        const BooleanTemplate = (rowData) => {
          const value = rowData[field];
          return <Tag severity={value ? "success" : "danger"} value={value ? "Yes" : "No"} />;
        };
        BooleanTemplate.displayName = "BooleanTemplate";
        return BooleanTemplate;
      }

      case "image": {
        const ImageTemplate = (rowData) => {
          const value = rowData[field];
          return value ? (
            <Image
              src={value}
              alt={`${field}`}
              width={32}
              height={32}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : null;
        };
        ImageTemplate.displayName = "ImageTemplate";
        return ImageTemplate;
      }

      case "custom":
        return column.body;

      default:
        return null; // Use default rendering
    }
  };

  // Render columns
  const renderColumns = useMemo(
    () =>
      columns.map((col, index) => {
        const {
          field,
          header,
          sortable = true,
          filter = false,
          style = {},
          className: colClassName = "",
          frozen = false,
          ...columnProps
        } = col;

        const bodyTemplate = createBodyTemplate(col);
        const filterTemplate = filter ? createFilterTemplate(col) : null;

        return (
          <Column
            key={field || index}
            field={field}
            header={header}
            sortable={sortable}
            filter={filter}
            filterElement={filterTemplate}
            body={bodyTemplate}
            style={{ minWidth: "8rem", ...style }}
            className={colClassName}
            frozen={frozen}
            {...columnProps}
          />
        );
      }),
    [columns],
  );

  const header = renderHeader();

  return (
    <div className={`card p-6 bg-white rounded-lg shadow-sm ${className}`}>
      <PrimeDataTable
        value={data}
        paginator={paginator}
        rows={rows}
        rowsPerPageOptions={rowsPerPageOptions}
        dataKey="id"
        filters={filters}
        filterDisplay={filterDisplay}
        loading={loading}
        responsiveLayout="scroll"
        globalFilterFields={globalFilterFields}
        header={header}
        emptyMessage={emptyMessage}
        className="p-datatable-sm"
        selectionMode={selectionMode}
        selection={selectedRows}
        onSelectionChange={handleRowSelect}
        onRowClick={handleRowClick}
        rowHover={!!onRowClick}
        style={onRowClick ? { cursor: "pointer", ...tableStyle } : tableStyle}
        sortMode={sortMode}
        showGridlines={showGridlines}
        stripedRows={stripedRows}
        {...props}
      >
        {renderColumns}
      </PrimeDataTable>
    </div>
  );
};

export default DataTable;
