"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ActionButtonGroup = ({
  actions = [],
  className,
  size = "sm",
  variant = "outline",
  orientation = "horizontal", // "horizontal" | "vertical"
  ...props
}) => {
  const containerClass = orientation === "vertical" ? "flex flex-col gap-2" : "flex gap-2";

  return (
    <div className={cn(containerClass, className)} {...props}>
      {actions.map((action, index) => (
        <Button
          key={action.key || index}
          size={size}
          variant={action.variant || variant}
          onClick={action.onClick}
          disabled={action.disabled}
          className={action.className}
          title={action.tooltip}
        >
          {action.icon && <action.icon className="w-4 h-4 mr-1" />}
          {action.label}
        </Button>
      ))}
    </div>
  );
};

// Predefined action button groups
const TableRowActions = ({
  onEdit,
  onDelete,
  onView,
  onToggle,
  editLabel = "Edit",
  deleteLabel = "Delete",
  viewLabel = "View",
  toggleLabel = "Toggle",
  showEdit = true,
  showDelete = true,
  showView = false,
  showToggle = false,
  ...props
}) => {
  const actions = [];

  if (showView && onView) {
    actions.push({
      key: "view",
      label: viewLabel,
      onClick: onView,
      icon: ({ className }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      ),
      variant: "outline",
    });
  }

  if (showEdit && onEdit) {
    actions.push({
      key: "edit",
      label: editLabel,
      onClick: onEdit,
      icon: ({ className }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      ),
      variant: "outline",
    });
  }

  if (showToggle && onToggle) {
    actions.push({
      key: "toggle",
      label: toggleLabel,
      onClick: onToggle,
      icon: ({ className }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      ),
      variant: "outline",
    });
  }

  if (showDelete && onDelete) {
    actions.push({
      key: "delete",
      label: deleteLabel,
      onClick: onDelete,
      icon: ({ className }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      ),
      variant: "destructive",
    });
  }

  return <ActionButtonGroup actions={actions} {...props} />;
};

const TableHeaderActions = ({
  onAdd,
  onImport,
  onExport,
  onRefresh,
  addLabel = "Add New",
  importLabel = "Import",
  exportLabel = "Export",
  refreshLabel = "Refresh",
  showAdd = true,
  showImport = false,
  showExport = false,
  showRefresh = false,
  ...props
}) => {
  const actions = [];

  if (showAdd && onAdd) {
    actions.push({
      key: "add",
      label: addLabel,
      onClick: onAdd,
      icon: ({ className }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      ),
      variant: "default",
    });
  }

  if (showImport && onImport) {
    actions.push({
      key: "import",
      label: importLabel,
      onClick: onImport,
      icon: ({ className }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
          />
        </svg>
      ),
      variant: "outline",
    });
  }

  if (showExport && onExport) {
    actions.push({
      key: "export",
      label: exportLabel,
      onClick: onExport,
      icon: ({ className }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
      ),
      variant: "outline",
    });
  }

  if (showRefresh && onRefresh) {
    actions.push({
      key: "refresh",
      label: refreshLabel,
      onClick: onRefresh,
      icon: ({ className }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      ),
      variant: "outline",
    });
  }

  return <ActionButtonGroup actions={actions} {...props} />;
};

export { ActionButtonGroup, TableRowActions, TableHeaderActions };
