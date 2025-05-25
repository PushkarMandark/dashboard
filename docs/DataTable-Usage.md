# Reusable DataTable Component

A powerful, flexible, and reusable DataTable component built on top of PrimeReact DataTable with enhanced features and easy configuration.

## Features

- ✅ **Flexible Column Configuration** - Support for various data types
- ✅ **Built-in Search & Filtering** - Global search and column-specific filters
- ✅ **Sorting & Pagination** - Multi-column sorting with customizable pagination
- ✅ **Row Selection & Click Handlers** - Single/multiple selection with click events
- ✅ **Export Functionality** - Built-in export capabilities
- ✅ **Custom Templates** - Support for custom column rendering
- ✅ **Loading States** - Built-in loading indicators
- ✅ **Responsive Design** - Mobile-friendly responsive layout
- ✅ **Action Buttons** - Support for table-level and row-level actions

## Basic Usage

```jsx
import DataTable from "@/components/ui/data-table";
import { createTextColumn, createCurrencyColumn } from "@/utils/tableColumns";

const MyComponent = () => {
  const data = [
    { id: 1, name: "Product 1", price: 99.99 },
    { id: 2, name: "Product 2", price: 149.99 },
  ];

  const columns = [
    createTextColumn("name", "Product Name"),
    createCurrencyColumn("price", "Price"),
  ];

  return (
    <DataTable
      data={data}
      columns={columns}
      title="Products"
      searchPlaceholder="Search products..."
    />
  );
};
```

## Column Types

### Text Column

```jsx
createTextColumn("name", "Name", {
  filterPlaceholder: "Search by name",
  style: { minWidth: "12rem" },
});
```

### Currency Column

```jsx
createCurrencyColumn("price", "Price", {
  style: { minWidth: "10rem" },
});
```

### Tag Column (with status colors)

```jsx
createTagColumn(
  "status",
  "Status",
  [
    { value: "Active", label: "Active", severity: "success" },
    { value: "Inactive", label: "Inactive", severity: "danger" },
  ],
  {
    style: { minWidth: "8rem" },
  },
);
```

### Date Column

```jsx
createDateColumn("createdAt", "Created", {
  format: { year: "numeric", month: "short", day: "numeric" },
  style: { minWidth: "10rem" },
});
```

### Number Column

```jsx
createNumberColumn("quantity", "Quantity", {
  style: { minWidth: "8rem" },
});
```

### Boolean Column

```jsx
createBooleanColumn("isActive", "Active", {
  style: { minWidth: "6rem" },
});
```

### Custom Column

```jsx
createCustomColumn(
  "actions",
  "Actions",
  (rowData) => (
    <div className="flex gap-2">
      <Button icon="pi pi-pencil" onClick={() => edit(rowData)} />
      <Button icon="pi pi-trash" onClick={() => delete rowData} />
    </div>
  ),
  {
    style: { minWidth: "10rem" },
  },
);
```

## Advanced Features

### Row Click Handling

```jsx
const handleRowClick = (event) => {
  console.log("Clicked row:", event.data);
  setSelectedItem(event.data);
};

<DataTable data={data} columns={columns} onRowClick={handleRowClick} />;
```

### Table Actions

```jsx
const tableActions = (
  <>
    <Button label="Add New" icon="pi pi-plus" onClick={handleAdd} />
    <Button label="Import" icon="pi pi-upload" onClick={handleImport} />
  </>
);

<DataTable data={data} columns={columns} actions={tableActions} />;
```

### Export Functionality

```jsx
<DataTable data={data} columns={columns} exportable={true} onExport={() => exportToExcel(data)} />
```

### Custom Filtering

```jsx
<DataTable
  data={data}
  columns={columns}
  globalFilterFields={["name", "email", "phone"]}
  searchPlaceholder="Search users..."
/>
```

## Props Reference

| Prop                 | Type      | Default            | Description                |
| -------------------- | --------- | ------------------ | -------------------------- |
| `data`               | Array     | `[]`               | Array of data objects      |
| `columns`            | Array     | `[]`               | Column configuration array |
| `loading`            | Boolean   | `false`            | Show loading state         |
| `title`              | String    | `"Data"`           | Table title                |
| `searchPlaceholder`  | String    | `"Search..."`      | Search input placeholder   |
| `emptyMessage`       | String    | `"No data found."` | Message when no data       |
| `onRowClick`         | Function  | -                  | Row click handler          |
| `onRowSelect`        | Function  | -                  | Row selection handler      |
| `selectionMode`      | String    | `"single"`         | Selection mode             |
| `paginator`          | Boolean   | `true`             | Enable pagination          |
| `rows`               | Number    | `10`               | Rows per page              |
| `rowsPerPageOptions` | Array     | `[5,10,25,50]`     | Page size options          |
| `globalFilterFields` | Array     | `[]`               | Fields for global search   |
| `exportable`         | Boolean   | `false`            | Show export button         |
| `onExport`           | Function  | -                  | Export handler             |
| `actions`            | ReactNode | -                  | Table action buttons       |

## Using with Data Hook

```jsx
import { useTableData } from "@/hooks/useTableData";

const MyComponent = () => {
  const { data, loading, updateItem, deleteItem } = useTableData(initialData);

  const handleSave = (updatedItem) => {
    updateItem(updatedItem);
  };

  const handleDelete = (itemId) => {
    deleteItem(itemId);
  };

  return (
    <DataTable
      data={data}
      loading={loading}
      columns={columns}
      onRowClick={(event) => setSelectedItem(event.data)}
    />
  );
};
```

## Predefined Configurations

The utility provides predefined configurations for common use cases:

```jsx
import { statusConfigurations, categoryConfigurations } from "@/utils/tableColumns";

// Use predefined status options
createTagColumn("status", "Status", statusConfigurations.product);

// Use predefined categories
createDropdownColumn("category", "Category", categoryConfigurations.product);
```

## Examples

See the following pages for complete examples:

- `/dashboard` - Products table with edit functionality
- `/users` - Users management with actions
- `/orders` - Orders with custom templates

## Styling

The component uses Tailwind CSS classes and can be customized through:

- Global CSS variables
- Custom column styles
- PrimeReact theme customization
- Tailwind utility classes
