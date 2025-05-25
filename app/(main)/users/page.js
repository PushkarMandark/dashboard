"use client";
import React, { useState } from "react";

import { TableHeaderActions, TableRowActions } from "@/components/ui/action-buttons";
import ClientOnly from "@/components/ui/client-only";
import { SelectedUserDisplay } from "@/components/ui/data-display";
import DataTable from "@/components/ui/data-table";
import { PageContainer } from "@/components/ui/page-container";
import TableSkeleton from "@/components/ui/table-skeleton";
import { useTableData } from "@/hooks/useTableData";
import { generateUsers } from "@/utils/mockDataGenerator";
import {
  createTextColumn,
  createDateColumn,
  createTagColumn,
  createBooleanColumn,
  createImageColumn,
  createActionColumn,
  statusConfigurations,
} from "@/utils/tableColumns";

const UsersPage = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  // Generate deterministic mock data to avoid hydration issues
  const [initialUsers] = useState(() => generateUsers(25));

  // Use the table data hook
  const { data: users, loading, updateItem, deleteItem } = useTableData(initialUsers);

  // Handle row click
  const handleRowClick = (event) => {
    setSelectedUser(event.data);
    console.warn("Selected user:", event.data);
  };

  // Handle user actions
  const handleEdit = (user) => {
    console.warn("Edit user:", user);
    // Open edit dialog
  };

  const handleDelete = (user) => {
    if (confirm(`Are you sure you want to delete ${user.name}?`)) {
      deleteItem(user.id);
    }
  };

  const handleToggleStatus = (user) => {
    const newStatus = user.status === "Active" ? "Inactive" : "Active";
    updateItem({ ...user, status: newStatus });
  };

  // Action buttons template
  const actionBodyTemplate = (rowData) => (
    <TableRowActions
      onEdit={(e) => {
        e.stopPropagation();
        handleEdit(rowData);
      }}
      onToggle={(e) => {
        e.stopPropagation();
        handleToggleStatus(rowData);
      }}
      onDelete={(e) => {
        e.stopPropagation();
        handleDelete(rowData);
      }}
      showToggle
      toggleLabel="Toggle Status"
    />
  );

  // Define table columns
  const columns = [
    createImageColumn("avatar", "Avatar", {
      style: { minWidth: "6rem" },
    }),
    createTextColumn("name", "Name", {
      style: { minWidth: "12rem" },
    }),
    createTextColumn("email", "Email", {
      style: { minWidth: "15rem" },
    }),
    createTextColumn("phone", "Phone", {
      style: { minWidth: "12rem" },
    }),
    createTextColumn("role", "Role", {
      filterType: "dropdown",
      filterOptions: ["Admin", "User", "Manager", "Editor"],
      style: { minWidth: "8rem" },
    }),
    createTagColumn("status", "Status", statusConfigurations.user, {
      style: { minWidth: "8rem" },
    }),
    createBooleanColumn("isActive", "Active", {
      style: { minWidth: "6rem" },
    }),
    createDateColumn("createdAt", "Created", {
      style: { minWidth: "10rem" },
    }),
    createActionColumn("Actions", actionBodyTemplate, {
      style: { minWidth: "10rem" },
    }),
  ];

  // Table actions
  const tableActions = (
    <TableHeaderActions
      onAdd={() => console.warn("Add new user")}
      onImport={() => console.warn("Import users")}
      onExport={() => console.warn("Export users")}
      showImport
      showExport
      addLabel="Add User"
    />
  );

  return (
    <PageContainer>
      <ClientOnly fallback={<TableSkeleton />}>
        <DataTable
          data={users}
          columns={columns}
          loading={loading}
          title="Users Management"
          searchPlaceholder="Search users..."
          emptyMessage="No users found."
          onRowClick={handleRowClick}
          globalFilterFields={["name", "email", "phone", "role"]}
          exportable
          onExport={() => console.warn("Export users")}
          actions={tableActions}
          rows={15}
          rowsPerPageOptions={[10, 15, 25, 50]}
        />
      </ClientOnly>

      {selectedUser && <SelectedUserDisplay user={selectedUser} />}
    </PageContainer>
  );
};

export default UsersPage;
