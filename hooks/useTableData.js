"use client";

import { useState, useEffect, useCallback } from "react";

export const useTableData = (initialData = [], options = {}) => {
  const { autoLoad = true, loadFunction, onError, onSuccess } = options;

  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  // Load data function
  const loadData = useCallback(async () => {
    if (!loadFunction) {
      setData(initialData);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await loadFunction();
      setData(result);
      if (onSuccess) onSuccess(result);
    } catch (err) {
      setError(err);
      if (onError) onError(err);
      console.error("Error loading table data:", err);
    } finally {
      setLoading(false);
    }
  }, [loadFunction, initialData, onSuccess, onError]);

  // Initialize data on mount
  useEffect(() => {
    if (autoLoad && loadFunction) {
      loadData();
    } else if (initialData && initialData.length > 0 && data.length === 0) {
      // If no load function but we have initial data, use it
      setData(initialData);
    }
  }, [autoLoad]); // Only depend on autoLoad to avoid infinite loops

  // Add new item
  const addItem = useCallback((newItem) => {
    setData((prevData) => [...prevData, newItem]);
  }, []);

  // Update existing item
  const updateItem = useCallback((updatedItem, idField = "id") => {
    setData((prevData) =>
      prevData.map((item) => (item[idField] === updatedItem[idField] ? updatedItem : item)),
    );
  }, []);

  // Delete item
  const deleteItem = useCallback((itemId, idField = "id") => {
    setData((prevData) => prevData.filter((item) => item[idField] !== itemId));
  }, []);

  // Delete multiple items
  const deleteItems = useCallback((itemIds, idField = "id") => {
    setData((prevData) => prevData.filter((item) => !itemIds.includes(item[idField])));
  }, []);

  // Select item
  const selectItem = useCallback((item) => {
    setSelectedItem(item);
  }, []);

  // Clear selection
  const clearSelection = useCallback(() => {
    setSelectedItem(null);
  }, []);

  // Refresh data
  const refresh = useCallback(() => {
    loadData();
  }, [loadData]);

  // Reset to initial state
  const reset = useCallback(() => {
    setData(initialData);
    setError(null);
    setSelectedItem(null);
  }, [initialData]);

  return {
    // Data state
    data,
    loading,
    error,
    selectedItem,

    // Data manipulation
    setData,
    addItem,
    updateItem,
    deleteItem,
    deleteItems,
    selectItem,
    clearSelection,

    // Actions
    loadData,
    refresh,
    reset,
  };
};
