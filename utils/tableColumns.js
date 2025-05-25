// Utility functions for creating common column configurations

export const createTextColumn = (field, header, options = {}) => ({
  field,
  header,
  type: "text",
  sortable: true,
  filter: true,
  filterType: "text",
  style: { minWidth: "12rem" },
  ...options,
});

export const createNumberColumn = (field, header, options = {}) => ({
  field,
  header,
  type: "number",
  sortable: true,
  filter: true,
  filterType: "number",
  style: { minWidth: "8rem" },
  ...options,
});

export const createCurrencyColumn = (field, header, options = {}) => ({
  field,
  header,
  type: "currency",
  sortable: true,
  filter: true,
  filterType: "number",
  style: { minWidth: "10rem" },
  ...options,
});

export const createPercentageColumn = (field, header, options = {}) => ({
  field,
  header,
  type: "percentage",
  sortable: true,
  filter: true,
  filterType: "number",
  style: { minWidth: "8rem" },
  ...options,
});

export const createDateColumn = (field, header, options = {}) => ({
  field,
  header,
  type: "date",
  sortable: true,
  filter: true,
  filterType: "date",
  format: { year: "numeric", month: "short", day: "numeric" },
  style: { minWidth: "10rem" },
  ...options,
});

export const createTagColumn = (field, header, tagOptions, options = {}) => ({
  field,
  header,
  type: "tag",
  sortable: true,
  filter: true,
  filterType: "dropdown",
  filterOptions: tagOptions.map((opt) => opt.value),
  options: tagOptions,
  style: { minWidth: "10rem" },
  ...options,
});

export const createDropdownColumn = (field, header, dropdownOptions, options = {}) => ({
  field,
  header,
  type: "text",
  sortable: true,
  filter: true,
  filterType: "dropdown",
  filterOptions: dropdownOptions,
  style: { minWidth: "12rem" },
  ...options,
});

export const createBooleanColumn = (field, header, options = {}) => ({
  field,
  header,
  type: "boolean",
  sortable: true,
  filter: true,
  filterType: "dropdown",
  filterOptions: [true, false],
  style: { minWidth: "8rem" },
  ...options,
});

export const createImageColumn = (field, header, options = {}) => ({
  field,
  header,
  type: "image",
  sortable: false,
  filter: false,
  style: { minWidth: "6rem" },
  ...options,
});

export const createCustomColumn = (field, header, bodyTemplate, options = {}) => ({
  field,
  header,
  type: "custom",
  body: bodyTemplate,
  sortable: false,
  filter: false,
  style: { minWidth: "8rem" },
  ...options,
});

export const createActionColumn = (header, bodyTemplate, options = {}) => ({
  header,
  type: "custom",
  body: bodyTemplate,
  sortable: false,
  filter: false,
  frozen: true,
  alignFrozen: "right",
  style: { minWidth: "8rem" },
  ...options,
});

// Predefined column configurations for common use cases
export const commonColumns = {
  id: createNumberColumn("id", "ID", { style: { minWidth: "6rem" } }),
  name: createTextColumn("name", "Name"),
  email: createTextColumn("email", "Email"),
  phone: createTextColumn("phone", "Phone"),
  price: createCurrencyColumn("price", "Price"),
  quantity: createNumberColumn("quantity", "Quantity"),
  total: createCurrencyColumn("total", "Total"),
  createdAt: createDateColumn("createdAt", "Created"),
  updatedAt: createDateColumn("updatedAt", "Updated"),
  isActive: createBooleanColumn("isActive", "Active"),
};

// Status configurations for different entities
export const statusConfigurations = {
  product: [
    { value: "In Stock", label: "In Stock", severity: "success" },
    { value: "Low Stock", label: "Low Stock", severity: "warning" },
    { value: "Out of Stock", label: "Out of Stock", severity: "danger" },
  ],
  order: [
    { value: "Pending", label: "Pending", severity: "warning" },
    { value: "Processing", label: "Processing", severity: "info" },
    { value: "Shipped", label: "Shipped", severity: "primary" },
    { value: "Delivered", label: "Delivered", severity: "success" },
    { value: "Cancelled", label: "Cancelled", severity: "danger" },
  ],
  user: [
    { value: "Active", label: "Active", severity: "success" },
    { value: "Inactive", label: "Inactive", severity: "secondary" },
    { value: "Suspended", label: "Suspended", severity: "danger" },
  ],
  payment: [
    { value: "Paid", label: "Paid", severity: "success" },
    { value: "Pending", label: "Pending", severity: "warning" },
    { value: "Failed", label: "Failed", severity: "danger" },
    { value: "Refunded", label: "Refunded", severity: "info" },
  ],
};

// Category configurations
export const categoryConfigurations = {
  product: ["Electronics", "Clothing", "Accessories", "Furniture", "Books", "Sports"],
  expense: ["Office", "Travel", "Marketing", "Equipment", "Software", "Utilities"],
  project: ["Development", "Design", "Marketing", "Research", "Support"],
};
